import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24,color: 'rgb(226, 99, 120)'  }} spin />;

const AppSpin: React.FC = () => <Spin indicator={antIcon} />;

export default AppSpin;