import { useEffect, useState } from "react";
import { Table } from 'antd';

import request from "../server";

const StudentPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData();
  }, []);
  
  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("Teacher");
  
      const promises = data.map((teacher) => request.get(`Teacher/${teacher.id}/Students`));
  
      const results = await Promise.all(promises);
      const flattenedData = results.map(response => response.data).flat();
      setData(flattenedData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }


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
    }
  ];

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
        </div>
      )}
      columns={columns}
      dataSource={data}
      rowKey='id'
    />
  );
};

export default StudentPage;