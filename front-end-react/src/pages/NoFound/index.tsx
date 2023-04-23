import React from 'react';
import { Button, Result } from 'antd';

const NoFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="暂时无法访问,需管理员启动"
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default NoFound;