import EventService from "@/services/EventService";
import { LockOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, FormInstance, Input, Modal, Result, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Marquee from 'react-fast-marquee';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import './style.less';



function getTagColor() {
    const allColor = ['magenta', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
    return allColor[Math.floor(Math.random() * 10)];
}

const SelectWhoYouLike = ({userDetails}:any) => {
    const formRef = React.useRef<FormInstance>(null);
    const [selectableGuests, setSelectableGuests] = useState<any>(null);
    const [locked, setLocked] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [cEventId, setCurEventId] = useState("");
    const onFinish = (values: any) => {
        if (values.users && values.users.length > 0) {
            setMsg(`你确定选择${values.users[0].eventId}号嘉宾${values.users[0].realName}吗？`);
            setCurEventId(values.users[0].eventId);
            setOpen(true);
        }
    };
    const nav = useNavigate();
    useEffect(() => {
        EventService.getSelectableGuests().then((res) => {
            if(res){
                if(res.data.pagesStatus.selectPage==='1'){
                    setSelectableGuests(res.data.guestList);
                    setLocked(false);
                }
            }
        })
    }, [userDetails]);
    return (
        <div className="select-love-container">
            <Modal
                title='注意'
                centered
                open={open}
                width={600}
                onCancel={() => {
                    setOpen(false);
                }}
                footer={<>
                    <Button
                        type="primary"
                        onClick={() => {
                            EventService.selectSweetHearts(cEventId).then((res) => { 
                                if(res){
                                    nav("/success");
                                }
                                setOpen(false);
                             })
                        }}
                    >
                        确定
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}>再想想</Button>
                </>
                }
            >
                {msg}
            </Modal>
            {!locked?
            <>
            <Alert
                banner
                message={
                    <Marquee pauseOnHover gradient={false}>
                        选择你的心动女生
                    </Marquee>
                }
            />
            {selectableGuests && <div className="card">
                <Divider>所有可选嘉宾</Divider>
                {Object.keys(selectableGuests)
                    .map((s: any, i: number) =>
                        <Tag key={i} color={getTagColor()}>
                            {`${s}-${selectableGuests[s]}`}
                        </Tag>
                    )}

                <Divider orientation="left"></Divider>
                <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    ref={formRef}
                >
                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'eventId']}
                                            rules={[
                                                { required: true, message: '他的活动番号' },
                                                () => ({
                                                    validator(_, value) {
                                                        if (value) {
                                                            const tForm = formRef.current?.getFieldsValue();
                                                            if (selectableGuests[value]) {
                                                                tForm.users[name].realName = selectableGuests[value];
                                                                formRef.current?.setFieldsValue(tForm);
                                                            } else {
                                                                return Promise.reject("此嘉宾暂不可选");
                                                            }
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input placeholder={`番号`}/>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'realName']}
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                        disabled={!(!formRef.current || formRef.current.getFieldsValue().users.length < 1)}
                                    >
                                        Add
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
            </>:<Result
                    icon={<LockOutlined />}
                    title="画面暂不可见"
                    extra={<Button onClick={() => nav('/heartbeat')}>返回主页</Button>}
                />}
        </div>
    )
}

export default connect(
    (state: any) => ({
        eventDetails: state.InitializeObj.guestDetailsList,
        userDetails: state.InitializeObj.myDetails
    }),
    {}
)(SelectWhoYouLike);