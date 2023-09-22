import { useParams } from "react-router-dom"

import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';


import request from "../server";

const StudentsPage = () => {
  const { id } = useParams()
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let { data } = await request.get(`Teacher/${id}/Students`);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setSelected(null)
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post(`Teacher/${id}/Students`, values);
      } else {
        await request.put(`Teacher/${id}/Students/${selected}`, values);
      }
      getData();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (data) => {
        return <img height='50' src={data} alt="img" />
      }
    },
    {
      title: 'IsMaried',
      dataIndex: 'isMaried',
      key: 'isMaried',
      render: (data) => data ? 'Married' : 'Not Married'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button className='edit-btn' id={record.id} onClick={() => handleEditClick(record.id)}>Edit</button>
          <button className='delete-btn' id={record.id} onClick={handleDeleteClick}>Delete</button>
        </Space>
      ),
    },
  ];


  const handleEditClick = async (ids) => {
    try {
      setSelected(ids)
      setIsModalOpen(true);
      let { data } = await request.get(`Teacher/${id}/Students/${ids}`);
      form.setFieldsValue(data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteClick = async (event) => {
    const ids = event.target.id;
    let deleteConfirm = confirm("Do you want to delete this teacher?");
    if (deleteConfirm) {
      try {
        await request.delete(`Teacher/${id}/Students/${ids}`);
        getData()
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Table
      loading={loading}
      bordered
      title={() => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Students {data.length}</h1>
          <div>
            <>
              <Button type="primary" onClick={showModal}>
                Add Teacher
              </Button>
              <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={selected === null ? 'Add Teacher' : 'Save Teacher'}>
                <Form
                  form={form}
                  name="basic"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                >
                  <Form.Item
                    label="FirstName"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your firstName!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="lastName"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your lastName!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Avatar"
                    name="avatar"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your avatar!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="isMaried"
                    valuePropName="checked"
                    wrapperCol={{
                      span: 24,
                    }}
                  >
                    <Checkbox>Is Married</Checkbox>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 10,
                      span: 14,
                    }}
                  >
                  </Form.Item>
                </Form>
              </Modal>
            </>
          </div>
        </div>
      )}
      columns={columns}
      dataSource={data}
      rowKey='id'
    />
  )
}

export default StudentsPage