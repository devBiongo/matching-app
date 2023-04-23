import ad01 from '@/assets/ad01.png'
import ad02 from '@/assets/ad02.jpg'
import { Button, Input, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.less'
const Advertisement = () => {
    const [secret, setSecret] = useState('');
    const push = useNavigate();
    return (
        <div className="adver-container">
            <p>关注下方两个公众号找管理员领取口令参加活动吧</p>
            <div>
                <img src={ad01} alt="" style={{
                    width: 300,
                    height: 200,
                    margin: 50
                }} />
            </div>
            <div>
                <img src={ad02} alt="" style={{
                    width: 200,
                    height: 200
                }} />
            </div>
            <div style={{ margin: 20, padding: 20 }}>
                <p>输入口令</p>
                <Input
                    placeholder="活动暗号"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    value={secret}
                    onChange={(e) => { setSecret(e.target.value) }}
                />
                <Button type="primary" onClick={() => {
                    if(secret==='123'){
                        push('/heartbeat');
                    }else{
                        message.warning('口令错误');
                    }
                }}>确定</Button>
            </div>
        </div>
    )
}

export default Advertisement;