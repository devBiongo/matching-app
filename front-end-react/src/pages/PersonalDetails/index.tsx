import './style.less'
import { useLocation } from 'react-router-dom';
import StringUtils from '@/utils/StringUtils';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';


function getRequireMaritalStatus(code: string) {
    switch (code) {
        case '0':
            return '均可';
        case '1':
            return '未婚';
        case '2':
            return '离异';
        default:
            return '';
    }
}
function getRequireAnnualIncome(code: string) {
    switch (code) {
        case '1':
            return '200万';
        case '2':
            return '300万';
        case '3':
            return '500万';
        case '4':
            return '1000万';
        default:
            return '';
    }
}
const PersonalDetails = () => {
    const { state: { detail } } = useLocation();
    const push = useNavigate();
    return (
        <div className="profile-container">
            <div className="avatar-area">
                <ArrowLeftOutlined className='turn-back' onClick={()=>{push(-1)}}/>
                <div className="img">
                    <Image src={StringUtils.getImgUrl(detail.avatarId)} />
                </div>
            </div>
            <div className="details-area">
                <p>个人资料</p>
                <span>{detail.realName}</span>
                <span>{detail.gender === '1' ? '男' : '女'}</span><span>{StringUtils.getRealAge(detail.birthday)}岁</span>
                <span>身高：{detail.height / 100}</span><span>最终学历：{StringUtils.getFinalEducation(detail.finalEducation)}</span>
                <span>籍贯：{detail.birthplace}</span>
                <span>现住城市：{detail.residence}</span><span>签证类型：{detail.visaType}</span>
                <span>职业类型：{detail.occupation}</span><span>年收入：{StringUtils.getAnnualIncome(detail.annualIncome)}</span>
                <span>{detail.maritalStatus === '0' ? '未婚' : '离异'}</span><span>微信：{detail.wechatNum ? detail.wechatNum : '暂不可见'}</span>
            </div>
            <div className="introduction-area">
                <p>择偶要求</p>
                <span>{`${detail.requireAgeFrom}~${detail.requireAgeTo}岁`}</span>
                <span>{`最低年薪：${getRequireAnnualIncome(detail.requireAnnualIncome)}`}</span>
                <span>{getRequireMaritalStatus(detail.requireMaritalStatus)}</span>
                <span>{`最低学历：${StringUtils.getFinalEducation(detail.requireFinalEducation)}`}</span>
                <span>{`身高：${detail.requireHeightFrom / 100}~${detail.requireHeightTo / 100}`}</span>
                <span>{`比较介意的地方：${detail.requireNuisance ? detail.requireNuisance : '无'}`}</span>

            </div>
            <div className="require-area">
                <p>自我介绍</p>
                <span>{detail.selfIntroduction}</span>
            </div>
        </div>
    )
}
export default PersonalDetails;