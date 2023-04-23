import AppReplyCard from "@/common/AppReplyCard";
import EventService from "@/services/EventService";
import { LockOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import './style.less';

const titleStyle = {
    color: '#e76178'
}
const SelectMe = ({ eventDetails, userDetails }: any) => {
    const [list, setList] = useState<any[]>([]);
    const [locked, setLocked] = useState<boolean>(true);
    const nav = useNavigate();
    useEffect(() => {
        EventService.fetchWhoSelectdMe().then((res) => {
            if (res) {
                if(res.data.pagesStatus.replyPage==="1"){
                    setList(res.data.list);
                    setLocked(false);
                }
            }
        })
    }, [userDetails]);
    return (
        <div className="select-me-container">
            {
                locked ? <Result
                    icon={<LockOutlined />}
                    title="画面暂不可见"
                    extra={<Button onClick={() => nav('/heartbeat')}>返回主页</Button>}
                /> :
                    <div className="card-area">
                        <span style={titleStyle}>{list.length===0?"暂时还没有人喜欢你":`有${list.length}人喜欢了你`}</span>
                        {list.map((s, i) =>
                            <div className="card-area" key={i}>
                                <AppReplyCard
                                    data={s}
                                    eventDetails={eventDetails}
                                    userDetails={userDetails}
                                />
                            </div>
                        )}
                    </div>
            }
        </div>
    )
}

export default connect(
    (state: any) => ({
        eventDetails: state.InitializeObj.guestDetailsList,
        userDetails: state.InitializeObj.myDetails
    }),
    {}
)(SelectMe);