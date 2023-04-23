import './style.less';
import { useEffect, useState } from "react";
import EventService from "@/services/EventService";
import AppSpin from "@/common/AppSpin";
import ChatCard from "@/common/ChatCard";
import { connect } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from 'react-router-dom';

const ChatList = ({ myDetails, eventDetails }: any) => {
    const { state } = useLocation();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const push = useNavigate();
    const getHerInfo = (initiatorId: string, targetId: string) => {
        if (initiatorId === myDetails.eventId) {
            return eventDetails.filter((s: any) => s.eventId === targetId)[0];
        }
        if (targetId === myDetails.eventId) {
            return eventDetails.filter((s: any) => s.eventId === initiatorId)[0];
        }
    }
    useEffect(() => {
        EventService.fetchMyChatList().then((res) => {
            if (res) {
                setList(res.data);
            }
            setLoading(false);
        })
    }, []);
    return (
        <div className="like-me-container" >
            <div style={{ padding: '20px', paddingBottom: '10px' }}>
                <span>消息</span>
            </div>
            <div style={{ padding: '20px', paddingTop: '10px' }}>
                <div className="chat-search">
                    <span className="vip">VIP</span>
                    <SearchOutlined className="vip-icon" />
                    <span className="vip-placeholder">搜索</span>
                </div>
            </div>
            <div className="content-area">
                {loading ? <div className="spin" style={{ textAlign: 'center' }}><AppSpin /></div>
                    : list.sort((a: any,b: any)=>{
                        if(a.updateTime<b.updateTime){
                            return 1;
                        }else if(a.updateTime>b.updateTime){
                            return -1;
                        }else{
                            return 0;
                        }
                    }).map((s: any, i: number) => {
                        return (
                            <div key={i} onClick={() => {
                                push('/chatWindow', {
                                    state: {
                                        myInfo: myDetails,
                                        herInfo: getHerInfo(s.initiatorId, s.targetId),
                                        replyObj: s,
                                    }
                                })
                            }}>
                                <ChatCard
                                    myDetails={myDetails}
                                    herInfo={getHerInfo(s.initiatorId, s.targetId)}
                                    replyObj={s}
                                    heightLightId={state && state.heightLightId}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
export default connect(
    (state: any) => ({
        myDetails: state.InitializeObj.myDetails,
        eventDetails: state.InitializeObj.guestDetailsList,
    }),
    {}
)(ChatList);