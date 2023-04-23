import EventService from '@/services/EventService';
import StringUtils from '@/utils/StringUtils';
import { CheckCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Modal, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.less';

const AppReplyCard = ({ eventDetails, data, userDetails, }: any) => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [reply, setReply] = useState("0");
    const [detail, setDetail] = useState<any>({});
    const nav = useNavigate();
    useEffect(() => {
        let tobj = null;
        if (data.initiatorId === userDetails.eventId) {
            tobj = eventDetails.filter((s: any) => s.eventId === data.targetId)[0];
        } else {
            tobj = eventDetails.filter((s: any) => s.eventId === data.initiatorId)[0];
        }
        setDetail(tobj);
    }, [data,userDetails,eventDetails]);
    return (
        <div className="reply-card-box">
            <Modal
                title='注意'
                centered
                open={open}
                width={600}
                onCancel={() => {
                    setOpen(false);
                }}
                footer={<>
                    <Button
                        type="primary"
                        onClick={() => {
                            EventService.replyGuestWhoSelectedMe(detail.eventId, reply).then((res) => {
                                if (res) {
                                    nav('/success')
                                }
                            })
                        }}
                    >
                        确定
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}>再想想</Button>
                </>
                }
            >
                {msg}
            </Modal>
            <div className="top-part">
                <div className="avatar-area">
                    <div className="avatar">
                        <img alt="" src={StringUtils.getImgUrl(detail.avatarId)} onClick={()=>{
                            nav('/personalDetails', { state: { detail } });
                        }}/>
                    </div>
                </div>
                <div className="status-area">
                    <span><CheckCircleFilled style={{ color: 'rgb(61 189 61' }} /></span>
                    <span>》》》</span>
                    <span><QuestionCircleFilled style={{ color: 'rgb(189 150 61)' }} /></span>
                </div>
                <div className="avatar-area" >
                    <div className="avatar">
                        <img alt="" src={StringUtils.getImgUrl(userDetails.avatarId)} />
                    </div>
                </div>
            </div>
            <div className="bottom-area">
                {/* eslint-disable-next-line */}
                <div className="left"><a href="#" onClick={() => {
                    message.warning('暂不支持此功能，你可以选择无视');
                }}>拒绝</a></div>
                {/* eslint-disable-next-line */}
                <div className="right"><a href="#" onClick={() => {
                    setReply("1");
                    setMsg("此操作不可逆，你确定想跟他牵手吗？系统将判定其他嘉宾自动弃权");
                    setOpen(true);
                }}>同意</a></div>
            </div>
        </div>
    )
}
export default AppReplyCard;