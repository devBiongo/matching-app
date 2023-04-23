import StringUtils from "@/utils/StringUtils";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, message, Select } from "antd"
import { useState } from "react";

export const findfilteredResult = (values: any, eventDetails: any[]) => {
    const result = [];
    for (const v of eventDetails) {
        if (values.requireAgeFrom &&
            Number(StringUtils.getRealAge(v.birthday)) < Number(values.requireAgeFrom)) continue;
        if (values.requireAgeTo &&
            Number(StringUtils.getRealAge(v.birthday)) > Number(values.requireAgeTo)) continue;
        if (values.requireHeightFrom &&
            Number(v.height) < Number(values.requireHeightFrom)) continue;
        if (values.requireHeightTo &&
            Number(v.height) > Number(values.requireHeightTo)) continue;
        if (values.requireAnnualIncome &&
            Number(v.annualIncome) < Number(values.requireAnnualIncome)) continue;
        if (values.requireFinalEducation &&
            Number(v.finalEducation) < Number(values.requireFinalEducation)) continue;
        if (values.requireMaritalStatus !== '2' &&
            values.requireMaritalStatus !== v.maritalStatus) continue;
        result.push(v);
    }
    return result;
}

export const RecommendArea = ({ setShowList, eventDetails, setOpen, standard, setStandard, setLoading }: any) => {
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={(values) => {
                setOpen(false);
                setLoading(true);
                const newList = findfilteredResult(values, eventDetails);
                setStandard(values);
                setShowList(newList);
                setTimeout(() => {
                    if(newList.length===0){
                        message.warning('没有找到符合的对象,你可以放宽点条件');
                    }
                    setLoading(false);
                }, 500);
            }}
            initialValues={standard}
        >
            <Form.Item
                label='年龄范围'
                style={{ marginBottom: 0 }}
            >
                <Form.Item
                    style={{ display: 'inline-block' }}
                    name="requireAgeFrom"
                >
                    < InputNumber />
                </Form.Item>
                <span style={{ lineHeight: 2, margin: '0 10px' }}>-</span>
                <Form.Item
                    style={{ display: 'inline-block' }}
                    name="requireAgeTo"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value) {
                                    if (getFieldValue('requireAgeFrom') && getFieldValue('requireAgeFrom') > value) {
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
                label='身高范围'
                style={{ marginBottom: 0 }}
            >
                <Form.Item
                    style={{ display: 'inline-block' }}
                    name="requireHeightFrom"
                >
                    < InputNumber />
                </Form.Item>
                <span style={{ lineHeight: 2, margin: '0 10px' }}>-</span>
                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                    name="requireHeightTo"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value) {
                                    if (getFieldValue('requireHeightFrom') && getFieldValue('requireHeightFrom') > value) {
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
                label='婚姻状况'
                name="requireMaritalStatus"
            >
                <Select>
                    <Select.Option value="2">均可</Select.Option>
                    <Select.Option value="0">未婚</Select.Option>
                    <Select.Option value="1">离异</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label='最低收入'
                name="requireAnnualIncome"
            >
                <Select>
                    <Select.Option value="1">200万</Select.Option>
                    <Select.Option value="2">300万</Select.Option>
                    <Select.Option value="3">500万</Select.Option>
                    <Select.Option value="4">1000万</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label='最低学历'
                name="requireFinalEducation"
            >
                <Select>
                    <Select.Option value="2">高中</Select.Option>
                    <Select.Option value="3">大专</Select.Option>
                    <Select.Option value="4">大学</Select.Option>
                    <Select.Option value="5">硕士</Select.Option>
                    <Select.Option value="6">博士</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" icon={<SearchOutlined />} style={{ float: 'right' }}>
                    查找
                </Button>

            </Form.Item>
        </Form>
    )
}

export const EventIdArea = ({ setShowList, eventDetails, setOpen, setLoading }: any) => {
    const [eventId, setEventId] = useState();
    return <div style={{ position: 'relative' }}>
        < InputNumber value={eventId} onChange={(e) => { setEventId(e as any) }} style={{ width: 200 }} />
        <Button
            shape="circle"
            icon={<SearchOutlined />}
            style={{ position: 'absolute', left: 220, top: 0 }}
            onClick={() => {
                setLoading(true);
                setOpen(false);
                const newList = eventDetails.filter((s: any) => {
                    return Number(s.eventId) === Number(eventId);
                });
                setShowList(newList);
                setTimeout(() => {
                    if(newList.length===0){
                        message.warning('没有找到符合的对象');
                    }
                    setLoading(false);
                }, 500);
            }}
        />
    </div>
}


