import { LoadingOutlined, ManOutlined, RightCircleOutlined, UserSwitchOutlined, WomanOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tag } from 'antd';
import './style.less';
import { useNavigate } from 'react-router-dom';
import StringUtils from '@/utils/StringUtils';
import { useState } from 'react';
import EventService from '@/services/EventService';
import { Image } from 'antd';

const AppProfileCard: any = ({ detail }: any) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    (
      <div className="card-container">
        <Modal
          title='注意'
          centered
          open={open}
          width={600}
          onCancel={() => {
            if(!loading){
              setOpen(false);
            }
          }}
          footer={<>
            <Button
              disabled={loading}
              type="primary"
              onClick={() => {
                setLoading(true)
                EventService.doTextHer(detail.eventId, 'empty').then((res) => {
                  setOpen(false);
                  if (res) {
                    nav('/chatList',{
                      state: {
                         heightLightId: detail.eventId
                      }
                  });
                    if((res as any).msg==='000'){
                      message.success('操作成功');
                    }else{
                      message.warning((res as any).msg);
                    }
                  }
                })
              }}
            >
              {loading ? <LoadingOutlined /> : '确定'}
            </Button>
            <Button
              disabled={loading}
              onClick={() => {
                setOpen(false);
              }}>再想想</Button>
          </>
          }
        >
          你只有5次邀请机会，你确定吗？
        </Modal>
        <div className="card-top">
          <div className="img-area">
            <Image
              width={110}
              src={StringUtils.getImgUrl(detail.avatarId)}
            />
          </div>
          <div className="detail">
            <p>{detail.realName}
              {detail.gender === '0' ?
                <WomanOutlined style={{ color: 'rgb(226, 99, 120)', marginLeft: '10px' }} />
                : <ManOutlined style={{ color: '#3d3dc1', marginLeft: '10px' }} />
              }
            </p>
            <div className="simple-info">
              <span>{StringUtils.getRealAge(detail.birthday)}岁</span>
              <span>{detail.maritalStatus === '0' ? '未婚' : '离异'}</span>
              <span>{detail.height}cm</span>
              <span>{StringUtils.getFinalEducation(detail.finalEducation)}</span>
              <span>{StringUtils.getAnnualIncome(detail.annualIncome)}</span>
            </div>
            <Tag color={detail.gender === '1' ? 'blue' : 'magenta'}>{`${detail.eventId}号${detail.gender === '1' ? '男' : '女'}嘉宾`}</Tag>
          </div>
        </div>
        <div className="card-middle">
          {detail.selfIntroduction}
        </div>
        <div className="card-bottom">
          <div>
            <UserSwitchOutlined className='icon-default' onClick={() => {
              setLoading(false);
              setOpen(true);
            }} />
            <span style={{ color: 'rgb(226, 99, 120)', marginLeft: '10px', fontSize: 14 }}>（现场互动邀请）</span>
          </div>
          <div><RightCircleOutlined className='icon-default' onClick={() => { nav('/personalDetails', { state: { detail } }) }} />
            <span style={{ color: 'rgb(226, 99, 120)', marginLeft: '10px', fontSize: 14 }}>（详细）</span></div>
        </div>
      </div>
    )
  )
}

export default AppProfileCard;