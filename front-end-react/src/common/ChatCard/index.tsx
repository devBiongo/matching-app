import StringUtils from "@/utils/StringUtils";
import { LoadingOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import './style.less';

const ChatCard = ({ myDetails, herInfo, replyObj, heightLightId }: any) => {
    return (
        <div className="chat-list-container" style={heightLightId === herInfo.eventId ? { backgroundColor: 'rgb(255 240 240)' } : {}}>
            <div className="chat-list-body">
                <div className="avatar-area">
                    <Avatar
                        src={StringUtils.getImgUrl(herInfo.avatarId)}
                        size={{ xs: 50 }}
                    />
                </div>
                <div className="message-area">
                    <div className="realName-area">
                        <span>{herInfo.realName}</span>
                        <span>{replyObj.updateTime.substring(0, 10)}</span>
                    </div>
                    <div className="latest-msg-area">
                        {getComponent(replyObj.replyFlag, herInfo.gender, myDetails.eventId === replyObj.initiatorId)}
                    </div>
                </div>
            </div>
        </div>
    )
}

function getComponent(replyFlag: string, gender: string, isMe: boolean) {
    if (isMe) {
        switch (replyFlag) {
            case '1':
                return <span style={{ color: '#f38598' }}>对方选择了同意，匹配成功</span>
            case '0':
                return <span style={{ color: '#62ad62' }}>对方拒绝了你，匹配失败</span>
            default:
                return <><LoadingOutlined style={{ marginRight: 10 }} /><span style={{ color: 'grey' }}>等待对方回复</span></>
        }
    } else {
        switch (replyFlag) {
            case '1':
                return <span style={{ color: '#f38598' }}>你选择了同意，匹配成功</span>
            case '0':
                return <span style={{ color: '#62ad62' }}>{`你拒绝了${gender==='1'?'他':'她'}，匹配失败`}</span>
            default:
                return <span style={{ color: 'grey' }}>{`${gender==='1'?'他':'她'}好像对你感兴趣，赶紧回复${gender==='1'?'他':'她'}吧`}</span>
        }
    }
}

export default ChatCard;