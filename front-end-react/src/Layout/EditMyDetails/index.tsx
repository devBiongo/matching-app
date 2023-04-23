import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Tag,
} from 'antd';
import AppUpload from '@/common/AppUpload';
import { message } from 'antd';
import './style.less'
import EventService from '@/services/EventService';
import { useEffect, useState } from 'react';
import { LoadingOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Image } from 'antd';
import StringUtils from '@/utils/StringUtils';
import AppSpin from '@/common/AppSpin';

const dateFormat = 'YYYY-MM-DD';
dayjs.extend(customParseFormat);
function fillZero(target: number) {
  if (target > 0 && target < 10) {
    return '0' + target;
  }
  return target;
}
function formatValue(values: any) {
  return {
    eventId: values.eventId,
    annualIncome: values.annualIncome,
    avatarId: values.avatarId,
    birthday: dayjs(values.birthday, dateFormat),
    birthplace: values.birthplace,
    finalEducation: values.finalEducation,
    gender: values.gender,
    height: values.height,
    maritalStatus: values.maritalStatus,
    occupation: values.occupation,
    phoneNum: values.phoneNum,
    privateFlag: values.privateFlag,
    realName: values.realName,
    requireAgeFrom: values.requireAgeFrom,
    requireAgeTo: values.requireAgeTo,
    requireAnnualIncome: values.requireAnnualIncome,
    requireFinalEducation: values.requireFinalEducation,
    requireHeightFrom: values.requireHeightFrom,
    requireHeightTo: values.requireHeightTo,
    requireMaritalStatus: values.requireMaritalStatus,
    requireNuisance: values.requireNuisance,
    residence: values.residence,
    selfIntroduction: values.selfIntroduction,
    visaType: values.visaType,
    wechatNum: values.wechatNum,
  }
}
const { TextArea } = Input;
const EditMyDetails = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<any>(undefined);
  const [photoPath, setPhotoPath] = useState<string>("");
  const onFinish = (values: any) => {
    setLoad(true);
    const date: Date = values.birthday.toDate();
    values.birthday = `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`;
    if (photoPath) values.avatarId = photoPath;
    EventService.doEventInfoUpdate(values).then((res) => {
      if (res) window.location.reload();
      setLoad(false);
    })
  };
  useEffect(() => {
    EventService.doFetchMyEventInfo().then((res) => {
      setInitValues(formatValue(res.data[0]));
    })
  }, []);
  const onFinishFailed = () => {
    message.warning('仔细检查下是不是漏填了什么');
  }
  return (
    <>{initValues ?
      <div className='edit-details-container'>
        <div className="card">
          <div className="img-area">
            <Image
              width={115}
              src={StringUtils.getImgUrl(initValues.avatarId)}
            />
          </div>
          <div className="contro-area">
            {!componentDisabled ?
              <LockOutlined className='lock' onClick={() => {
                setComponentDisabled(true);
              }}
              />
              : <UnlockOutlined className='lock' onClick={() => {
                setComponentDisabled(false);
              }}
              />
            }
            <p style={{ marginTop: 85 }}>
              <Tag
                color={initValues.gender === '1' ? 'blue' : 'magenta'}
                style={{ position: 'absolute', left: 0, bottom: 2 }}
              >
                {`${initValues.eventId}号嘉宾`}
              </Tag>
            </p>
          </div>
        </div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          disabled={!componentDisabled}
          initialValues={initValues}
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
            label={<>性别<span id='important-color'>（不可修改）</span></>}
            name="gender"
          >
            <Radio.Group disabled>
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
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
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
            label='更换头像'
            valuePropName="fileList"
            name='avatarId'
          >
            <AppUpload setPhotoPath={setPhotoPath} disabled={!componentDisabled} label='点击修改头像' />
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
          <Form.Item label="我要修改">
            <Button type="primary" htmlType="submit" id='submit-btn'>{load ? <LoadingOutlined /> : '保存'}</Button>
          </Form.Item>
        </Form>
      </div>
      : <div className='spin-area'><AppSpin/></div>}</>
  );
};

export default EditMyDetails;

