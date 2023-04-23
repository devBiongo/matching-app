import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  Modal,
} from 'antd';
import AppUpload from '@/common/AppUpload';
import './style.less'
import EventService from '@/services/EventService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { test2023 } from '@/test/eventInfo';

const { TextArea } = Input;
const TModal = ({ open, setOpen, msg }: any) => (
  <Modal
    title={null}
    centered
    open={open}
    onOk={() => setOpen(false)}
    onCancel={() => setOpen(false)}
    width={600}
    footer={null}
  >
    {msg}
  </Modal>
)
function fillZero(target: number) {
  if (target > 0 && target < 10) {
    return '0' + target;
  }
  return target;
}
const InfoRegis = () => {
  const push = useNavigate();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [photoPath, setPhotoPath] = useState<string>("");
  const onFinish = (values: any) => {
    if (photoPath) {
      setLoad(true);
      setComponentDisabled(false);
      values.avatarId = photoPath;
      const date: Date = values.birthday.toDate();
      values.birthday = `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`;
      EventService.doEventInfoRegis(values).then((res) => {
        if (res) {
          push('/advertisement', {
            replace: true,
          });
        } else {
          setComponentDisabled(true);
          setLoad(false);
        }
      });
    } else {
      if (values.gender === '0') {
        setOpen(true);
        setMsg('上传你的头像,让帅锅们看到你的盛世熔盐');
      } else {
        setOpen(true);
        setMsg('上传你的头像,用你的熔盐迷倒在场女嘉宾们');
      }
    }
  };
  const onFinishFailed = () => {
    setOpen(true);
    setMsg('仔细检查下你填写的信息');
  }
  return (
    <div className='info-regis-container'>
      <TModal open={open} setOpen={setOpen} msg={msg} />
      <p className='title'>请完善个人信息</p>
      <p>为了更好做公益性月老，我们会在活动结束后会脸部打码宣传您是否介意？</p>
      <Checkbox
        className='agreement'
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        我同意<span id='important-color'>（重要）</span>
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        disabled={!componentDisabled}
        initialValues={test2023}
      >
        <Form.Item
          label="姓名"
          name="realName"
          rules={[
            { required: true, message: '请输入你的姓名' },
            { pattern: /^([\u4e00-\u9fa5]{2,6})$/gi, message: '真实姓名哦,例:蔡徐坤' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择你的性别' }]}
        >
          <Radio.Group>
            <Radio value="1"> 男 </Radio>
            <Radio value="0"> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="出生年月"
          name="birthday"
          rules={[
            { required: true, message: '请选择你的出身年月' },
            () => ({
              validator(_, value) {
                if (value && ((new Date().getFullYear() - value.toDate().getFullYear()) < 18)) {
                  return Promise.reject("未成年人禁止参加");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={<>身高<span id='important-color'>（cm）</span></>}
          name="height"
          rules={[
            { required: true, message: '请输入你的身高' },
            () => ({
              validator(_, value) {
                if (value) {
                  if (value < 135) {
                    return Promise.reject(new Error('需大于135'));
                  }
                  if (value > 210) {
                    return Promise.reject(new Error('需小于210'));
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="最终学历"
          name="finalEducation"
          rules={[{ required: true, message: '请选择你的最终学历' }]}
        >
          <Select>
            <Select.Option value="1">初中</Select.Option>
            <Select.Option value="2">高中</Select.Option>
            <Select.Option value="3">大专</Select.Option>
            <Select.Option value="4">大学</Select.Option>
            <Select.Option value="5">硕士</Select.Option>
            <Select.Option value="6">博士</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="籍贯"
          name="birthplace"
          rules={[{ required: true, message: '请输入你的出身地' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="现住城市"
          name="residence"
          rules={[{ required: true, message: '请输入你的现住城市' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="签证类型"
          name="visaType"
          rules={[{ required: true, message: '请输入你的签证类型' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="职业"
          name="occupation"
          rules={[{ required: true, message: '请输入你的职业' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="年收入"
          name="annualIncome"
          rules={[{ required: true, message: '请选择你的年收入' }]}
        >
          <Select>
            <Select.Option value="1">200万~300万</Select.Option>
            <Select.Option value="2">300万~500万</Select.Option>
            <Select.Option value="3">500万~1000万</Select.Option>
            <Select.Option value="4">1000万以上</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="婚姻状况(已婚勿扰)"
          name="maritalStatus"
          rules={[{ required: true, message: '请选择你的婚姻状态' }]}
        >
          <Radio.Group>
            <Radio value="0"> 未婚 </Radio>
            <Radio value="1"> 离异 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="微信"
          name="wechatNum"
          rules={[{ required: true, message: '请输入你的微信号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phoneNum"
          rules={[
            { required: true, message: '请输入你的手机号' },
            { pattern: /^\d{11}$/, message: '手机号码应为11位' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="微信手机保密"
          name="privateFlag"
          rules={[{ required: true, message: '请选择是否保密你的微信手机号码' }]}
        >
          <Radio.Group>
            <Radio value="0"> 仅管理员可见 </Radio>
            <Radio value="1"> 所有人可见 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={<span className='img-required'>头像</span>}
          valuePropName="fileList"
          name='avatarId'
        >
          <AppUpload setPhotoPath={setPhotoPath} disabled={!componentDisabled} />
        </Form.Item>
        <Form.Item
          label={<span className='img-required'>自我介绍</span>}
          name="selfIntroduction"
          rules={[
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('自我介绍不可为空'));
                }
                if (value.length < 20) {
                  return Promise.reject(new Error(`最少20个字，当前${value.length}个字，还差${20 - value.length}个字`));
                }
                if (value.length > 50) {
                  return Promise.reject(new Error(`最多50个字，当前${value.length}个字，超出${value.length - 50}个字`));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <TextArea rows={4} placeholder='例: 全民制作人们大家好,我是练习时长两年半的个人练习生蔡徐坤, 喜欢唱,跳,rap,篮球,music~' />
        </Form.Item>
        {/* ---------------------择偶要求区域---------------------*/}
        <Form.Item
          label={<span className='img-required'>择偶要求-年龄范围</span>}
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            style={{ display: 'inline-block' }}
            name="requireAgeFrom"
            rules={[
              { required: true, message: '不可为空' },
              () => ({
                validator(_, value) {
                  if (value) {
                    if (value < 18) {
                      return Promise.reject(new Error('需成年'));
                    }
                    if (value > 60) {
                      return Promise.reject(new Error(`${value}岁？`));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            < InputNumber />
          </Form.Item>
          <span className='range'>-</span>
          <Form.Item
            style={{ display: 'inline-block' }}
            name="requireAgeTo"
            rules={[
              { required: true, message: '不可为空' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    if (value < 18) {
                      return Promise.reject(new Error('需成年'));
                    }
                    if (value > 60) {
                      return Promise.reject(new Error(`${value}岁？`));
                    }
                    if (getFieldValue('requireAgeFrom') && getFieldValue('requireAgeFrom') >= value) {
                      return Promise.reject(new Error(`${getFieldValue('requireAgeFrom')}~${value}岁?`));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label={<span className='img-required'>择偶要求-身高范围</span>}
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            style={{ display: 'inline-block' }}
            name="requireHeightFrom"
            rules={[
              { required: true, message: '不可为空' },
              () => ({
                validator(_, value) {
                  if (value) {
                    if (value < 135) {
                      return Promise.reject(new Error('需大于135'));
                    }
                    if (value > 210) {
                      return Promise.reject(new Error('需小于210'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            < InputNumber />
          </Form.Item>
          <span className='range'>-</span>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            name="requireHeightTo"
            rules={[
              { required: true, message: '不可为空' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    if (value < 135) {
                      return Promise.reject(new Error('需大于135'));
                    }
                    if (value > 210) {
                      return Promise.reject(new Error('需小于210'));
                    }
                    if (getFieldValue('requireHeightFrom') && getFieldValue('requireHeightFrom') >= value) {
                      return Promise.reject(new Error(`${getFieldValue('requireHeightFrom')}~${value}cm?`));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label='择偶要求-婚姻状况'
          name="requireMaritalStatus"
          rules={[
            { required: true, message: '请选择婚姻状况' }
          ]}
        >
          <Select>
            <Select.Option value="2">均可</Select.Option>
            <Select.Option value="0">未婚</Select.Option>
            <Select.Option value="1">离异</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='择偶要求-最低收入'
          name="requireAnnualIncome"
          rules={[
            { required: true, message: '请选择最低收入' }
          ]}
        >
          <Select>
            <Select.Option value="1">200万</Select.Option>
            <Select.Option value="2">300万</Select.Option>
            <Select.Option value="3">500万</Select.Option>
            <Select.Option value="4">1000万</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='择偶要求-最低学历'
          name="requireFinalEducation"
          rules={[
            { required: true, message: '请选择最低学历' }
          ]}
        >
          <Select>
            <Select.Option value="2">高中</Select.Option>
            <Select.Option value="3">大专</Select.Option>
            <Select.Option value="4">大学</Select.Option>
            <Select.Option value="5">硕士</Select.Option>
            <Select.Option value="6">博士</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='择偶要求-比较介意的地方'
          name="requireNuisance"
          rules={[
            { required: true, message: '请输入你比较介意的地方' },
            () => ({
              validator(_, value) {
                if (value) {
                  if (value.length < 5) {
                    return Promise.reject(new Error(`最少5个字，当前${value.length}个字，还差${5 - value.length}个字`));
                  }
                  if (value.length > 15) {
                    return Promise.reject(new Error(`最多15个字，当前${value.length}个字，超出${value.length - 15}个字`));
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="我已确认">
          <Button type="primary" htmlType="submit" id='submit-btn'>{load ? <LoadingOutlined /> : '提交'}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InfoRegis;