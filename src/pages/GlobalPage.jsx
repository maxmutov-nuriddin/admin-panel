import { Progress, Space } from 'antd';
import { useEffect, useState } from "react";
import request from '../server';


const GlobalPage = () => {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false)


  
  useEffect(() => {
    getDatas();
  }, []);

  async function getDatas() {
    try {
      setLoading(true);
      let { data } = await request.get("Teacher");
      setDatas(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }


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


  return (
    <div loading={loading}>
      <h1>GlobalPage</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
        <Space wrap>
          <Progress type="dashboard" percent={datas.length} />
        </Space>
        <div style={{width: '60%'}}>
          <Progress
            percent={datas.length}
            status="active"
            strokeColor={{
              from: '#108ee9',
              to: '#87d068',
            }}
          />
          <Progress
            percent={data.length}
            status="active"
            strokeColor={{
              from: '#108ee9',
              to: '#87d068',
            }}
          />
        </div>
        <Space wrap>
          <Progress type="dashboard" percent={data.length} />
        </Space>
      </div>
    </div>
  )
}

export default GlobalPage