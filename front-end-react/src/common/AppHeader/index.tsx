import { CloseCircleOutlined, HeartOutlined, HomeOutlined, MailOutlined, MenuOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Popover } from "antd";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import SessionStorage from '@/utils/SessionUtil';
import './style.less';

const iconStyle = { color: 'rgb(226, 99, 120)', fontSize: 20, marginTop: 16 }
const avatarStyle = { backgroundColor: '#fde3cf', color: '#f56a00'}

function switchMenuStatus() {
    const navbar = document.querySelector('#navbar') as any;
    navbar.classList.toggle('navbar-close');
}

function getMenus(status:string,gender:string){
    if(Number(status)<1){
        return [
            { path: '/heartbeat', label: '主页', component: <HomeOutlined className="icon" /> },
            { path: '/chatList', label: '消息', component: <MessageOutlined className="icon" /> },
            { path: '/editMyDetails', label: '我的资料', component: <UserOutlined className="icon" /> },
        ]
    }
    if(gender==='1'){
        let menus = [{ path: '/heartbeat', label: '主页', component: <HomeOutlined className="icon" /> }];
        if(['1','7'].includes(status)){
            menus.push({ path: '/selectWhoYouLike', label: '心动选择', component: <HeartOutlined className="icon" /> })
        }
        if(['5','11'].includes(status)){
            menus.push({ path: '/selectMe', label: '谁选了我', component: <MailOutlined className="icon" /> })
        }
        return menus;
    }else{
        let menus = [{ path: '/heartbeat', label: '主页', component: <HomeOutlined className="icon" /> }];
        if(['4','10'].includes(status)){
            menus.push({ path: '/selectWhoYouLike', label: '心动选择', component: <HeartOutlined className="icon" /> })
        }
        if(['2','8'].includes(status)){
            menus.push({ path: '/selectMe', label: '谁选了我', component: <MailOutlined className="icon" /> })
        }
        return menus;
    }
}

const AppHeader = ({ UserDetails,status }: any) => {
    const [isClosed, setClose] = useState(true);
    const push = useNavigate();
    return (
        <header>
            {
                isClosed ?
                    <MenuOutlined style={iconStyle} onClick={() => {
                        switchMenuStatus();
                        setClose(false);
                    }} /> :
                    <CloseCircleOutlined style={iconStyle} onClick={() => {
                        switchMenuStatus();
                        setClose(true);
                    }} />
            }
            <div className="avatar">
                <Popover
                    placement="bottomRight"
                    content={<Button type="text" onClick={() => {
                        SessionStorage.remove('event-token');
                        push('/login');
                    }}>退出登录</Button>}
                    trigger="click"
                >
                    <Avatar style={avatarStyle}>N.{UserDetails.eventId}</Avatar>
                </Popover>
            </div>
            <div id='navbar' className="navbar navbar-close">
                {
                    getMenus(status,UserDetails.gender).map((s, i) =>
                        /*eslint-disable-next-line*/
                        <a
                            key={i}
                            onClick={() => {
                                push(s.path);
                                switchMenuStatus();
                                setClose(true)
                            }}
                        >
                            {s.component}
                            <span>{s.label}</span>
                        </a>
                    )
                }
            </div>
        </header>
    )
}
export default AppHeader;