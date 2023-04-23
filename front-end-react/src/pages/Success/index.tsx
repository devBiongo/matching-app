import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
  const nav = useNavigate();
  return (
    <Result
      status="success"
      title="选择成功"
      subTitle="你的心动选择画面将会被锁住一段时间，请耐心等待管理员老吴宣布结果！！！"
      extra={[
        <Button type="primary" key="console" onClick={()=>nav('/heartbeat')}>
          回到主页
        </Button>
      ]}
    />
  )
};

export default Success;