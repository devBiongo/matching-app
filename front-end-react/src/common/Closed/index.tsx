import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.less';

const Closed = () => {
    const push = useNavigate();
    return (
        (
            <div className='closed-container'>
                <p>活动尚未开启！！！<Button onClick={()=>{push('/advertisement');}}>返回</Button></p>
                
            </div>
        )
    )
}

export default Closed;