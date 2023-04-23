import './style.less';
import { CaretRightOutlined, CheckOutlined, CloseOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Modal } from 'antd';
import StringUtils from '@/utils/StringUtils';
import Meta from 'antd/es/card/Meta';
import { useLocation, useNavigate } from 'react-router-dom';
import EventService from '@/services/EventService';
import { useEffect, useState } from 'react';

const Com1 = ({ myInfo, herInfo, replyObj }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');
    const [jReply, setJReply] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    useEffect(() => {
        setStatus(replyObj.replyFlag?replyObj.replyFlag:'6');
    }, [replyObj]);
    return <>
        <Modal
            title='注意'
            centered
            open={open}
            onOk={() => {
                EventService.doEditReply(herInfo.eventId, myInfo.eventId, jReply).then((res) => {
                    if (res) {
                        setStatus(jReply);
                        setOpen(false);
                    }
                })
            }}
            onCancel={() => setOpen(false)}
            width={600}
        >
            {msg}
        </Modal>
        <div className="first">
            <Avatar
                src={StringUtils.getImgUrl(herInfo.avatarId)}
                size={{ xs: 35 }}
                style={{ margin: '5px 10px', float: 'left' }}
            />
            <Card
                hoverable
                style={{ width: 200, float: 'left' }}
                cover={<img alt="example" src={StringUtils.getImgUrl(herInfo.avatarId)} />}
            >
                <Meta title={`${herInfo.realName}（${herInfo.eventId}号）`} description={`想邀请你和${herInfo.gender==='1'?'他':'她'}现场交流`} />
            </Card>
        </div>
        <div className='isAgree-area'>
            {status && (
                status === '1' ?
                    <>
                        <CheckOutlined style={{ color: '#f38598' }} />
                        <span style={{ color: '#f38598', marginLeft: 10 }}>你已同意，匹配成功</span>
                    </> :
                    status === '0' ?
                        <><CloseOutlined style={{ color: '#62ad62' }} />
                            <span style={{ color: '#62ad62', marginLeft: 10 }}>你已拒绝，匹配失败</span></> :
                        <>
                            <CaretRightOutlined />
                            <Button onClick={() => {
                                setJReply('1');
                                setMsg('因时间限制，你最多只能和三名嘉宾有现场交谈机会，此操作不可逆，你确定吗？');
                                setOpen(true);
                            }}>同意</Button>
                            <Button onClick={() => {
                                setJReply('0');
                                setMsg('此操作不可逆，你确定要拒绝他吗？');
                                setOpen(true);
                            }}>拒绝</Button>
                        </>
            )}

        </div>
    </>
}

const Com2 = ({ myInfo, herInfo, replyObj }: any) => {
    return (
        <>
            <div className="first">
                <Avatar
                    src={StringUtils.getImgUrl(myInfo.avatarId)}
                    size={{ xs: 35 }}
                    style={{ margin: '5px 10px', float: 'right' }}
                />
                <Card
                    hoverable
                    style={{ width: 200, float: 'right' }}
                    cover={<img alt="example" src={StringUtils.getImgUrl(myInfo.avatarId)} />}
                >
                    <Meta title={`${myInfo.realName}（${myInfo.eventId}号）`} description="想邀请你和我现场交流" />
                </Card>
            </div>
            <div className="second">
                <Avatar
                    src={StringUtils.getImgUrl(herInfo.avatarId)}
                    size={{ xs: 35 }}
                    style={{ margin: '5px 10px' }}
                />
                {
                    replyObj.replyFlag === '1' ? <Button disabled>同意</Button> :
                        replyObj.replyFlag === '0' ? <Button disabled>拒绝</Button> :
                            <Button icon={<LoadingOutlined />} style={{ margin: '7px 10px' }}>等待回复</Button>
                }
            </div>
        </>
    )
}

const ChatWindow = () => {
    const push = useNavigate();
    const { state: { myInfo, herInfo, replyObj } } = useLocation();
    return (
        <div className="chat-window">
            <div className="char-header">
                <LeftOutlined onClick={() => { push(-1) }} />
                <Avatar
                    src={StringUtils.getImgUrl(herInfo.avatarId)}
                    size={{ xs: 50 }}
                    style={{ margin: '5px 10px' }}
                />
                <span style={{ fontSize: 12 }}>{herInfo.realName}</span>
            </div>
            <div className="content">
                {replyObj.initiatorId === myInfo.eventId ?
                    <Com2 myInfo={myInfo} herInfo={herInfo} replyObj={replyObj} />
                    : <Com1 myInfo={myInfo} herInfo={herInfo} replyObj={replyObj} />
                }
            </div>
        </div>
    )
}
export default ChatWindow;