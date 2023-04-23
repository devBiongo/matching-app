import './style.less'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionStorage from '@/utils/SessionUtil';
import { Button, Checkbox, Form, Input, message } from 'antd';
import AuthService from '@/services/AuthService';
import { LoadingOutlined, LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import Cookie from '@/utils/Cookie';

function scroll() {
    const loginForm = document.querySelector('ul:first-child') as any;
    const registerForm = document.querySelector('ul:last-child') as any;
    loginForm.classList.toggle('login-form');
    registerForm.classList.toggle('register-form');
}
const iconStyle = { color: '#B3B3B3' }
const disableStyle = { color: 'black' }

const Authentication = () => {
    const [load, setLoad] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [authObj, setAuthObj] = useState({ username: '', password: '' });
    const push = useNavigate();
    // 登录
    const doLogin = (values: any) => {
        setLoad(true);
        SessionStorage.remove('event-token');
        AuthService.doAuthentication(values.username, values.password).then((res) => {
            if (res) {
                if (values.remember) {
                    Cookie.set("eventUsername", values.username);
                    Cookie.set("eventPassword", values.password);
                } else {
                    Cookie.remove("eventUsername");
                    Cookie.remove("eventPassword");
                }
                SessionStorage.set('event-token', (res as any).token);
                message.success("登录成功");
                if ((res as any).needComplete === '1') {
                    push('/infoRegis', {
                        replace: true,
                    });
                } else {
                    push('/advertisement', {
                        replace: true,
                    });
                }
            }
            setLoad(false);
        });
    }
    // 注册
    const doRegister = (values: any) => {
        setLoad(true);
        SessionStorage.remove('event-token');
        AuthService.doRegister(values.reUsername, values.rePassword).then((res) => {
            if (res) {
                message.success("注册成功");
                setAuthObj({ username: values.reUsername, password: values.rePassword });
                setIsLogin(true);
                setTimeout(() => {
                    scroll();
                }, 300);
            }
            setLoad(false);
        });
    }
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <ul>
                    <li>一番有缘</li>
                    <li>
                        {isLogin && (
                            <Form
                                name="normal_login"
                                initialValues={{
                                    remember: true,
                                    username: authObj.username || Cookie.get("eventUsername"),
                                    password: authObj.password || Cookie.get("eventPassword"),
                                }}
                                onFinish={doLogin}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: 'ikun!请输入你的账号!' },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined style={iconStyle} />} placeholder="账号" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'ikun!请输入你的密码!' },]}
                                >
                                    <Input
                                        prefix={<LockOutlined style={iconStyle} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>记住我</Checkbox>
                                    </Form.Item>
                                    {/* eslint-disable-next-line */}
                                    <a style={{ float: 'right' }} href="#" onClick={() => { alert('暂不支持此功能') }}>
                                        忘记密码？
                                    </a>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={load}>
                                        {load ? <div style={disableStyle}><LoadingOutlined /></div> : '登录'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </li>
                    <li><span>没有账号?</span><span onClick={() => {
                        if (isLogin) {
                            setTimeout(() => {
                                setIsLogin(false);
                            }, 800);
                            scroll();
                        }
                    }}>立即注册</span></li>
                </ul>
                <ul>
                    <li>一番有缘</li>
                    <li>
                        <Form
                            name="normal_register"
                            initialValues={{}}
                            onFinish={doRegister}
                        >
                            <Form.Item
                                name="reUsername"
                                rules={[
                                    { required: true, message: '账号不可为空' },
                                    { pattern: /^\w{5,16}$/, message: '字母或数字5到16位' }
                                ]}
                            >
                                <Input prefix={<UserOutlined style={iconStyle} />} placeholder="新规账号" />
                            </Form.Item>
                            <Form.Item
                                name="rePassword"
                                rules={[{ required: true, message: '密码不可为空' },
                                () => ({
                                    validator(_, value) {
                                        if (value && value.length < 8) {
                                            return Promise.reject(new Error('密码不能低于8位'));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined style={iconStyle} />}
                                    type="password"
                                    placeholder="你的密码"
                                />
                            </Form.Item>
                            <Form.Item
                                name="rePasswordConfirm"
                                rules={[{ required: true, message: 'ikun！确认下密码!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('rePassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('ikun!两次输入的密码要一致!'));
                                    },
                                }),
                                ]}
                            >
                                <Input
                                    prefix={<SafetyOutlined style={iconStyle} />}
                                    type="password"
                                    placeholder="确认密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={load}>
                                    {load ? <LoadingOutlined style={disableStyle} /> : '注册'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </li>
                    <li>
                        <span>已注册?</span>
                        <span onClick={() => {
                            if (!isLogin) {
                                setIsLogin(true);
                                scroll();
                            }
                        }}>立即登录</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Authentication;