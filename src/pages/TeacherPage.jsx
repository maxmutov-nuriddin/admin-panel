import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';


import request from '../server';
import { Link } from 'react-router-dom';

const TeacherPage = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("Teacher");
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
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
        await request.post("Teacher", values);
      } else {
        await request.put(`Teacher/${selected}`, values);
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
          <button className='see-btn'><Link to={`/students/${record.id}`}>See</Link></button>
        </Space>
      ),
    },
  ];


  const handleEditClick = async (id) => {
    try {
      setSelected(id)
      setIsModalOpen(true);
      let { data } = await request.get(`Teacher/${id}`);
      form.setFieldsValue(data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteClick = async (event) => {
    const id = event.target.id;
    let deleteConfirm = confirm("Do you want to delete this teacher?");
    if (deleteConfirm) {
      try {
        await request.delete(`Teacher/${id}`);
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
          <h1>Teachers {data.length}</h1>
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
};



export default TeacherPage;