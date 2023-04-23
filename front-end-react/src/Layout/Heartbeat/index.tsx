import AppProfileCard from '@/common/AppProfileCard';
import { message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './style.less';
import AppSpin from '@/common/AppSpin';
import { EventIdArea, findfilteredResult, RecommendArea } from '@/common/HearbeatComs';

function isActive(mode: number, code: number) {
    return mode === code ? 'selected' : '';
}

const Heartbeat = ({ eventDetails, userDetails }: any) => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<number>(1);
    const [showList, setShowList] = useState<any[]>([]);
    const [standard, setStandard] = useState({});
    useEffect(() => {
        setStandard({
            requireAgeFrom: userDetails.requireAgeFrom,
            requireAgeTo: userDetails.requireAgeTo,
            requireAnnualIncome: userDetails.requireAnnualIncome,
            requireFinalEducation: userDetails.requireFinalEducation,
            requireHeightFrom: userDetails.requireHeightFrom,
            requireHeightTo: userDetails.requireHeightTo,
            requireMaritalStatus: userDetails.requireMaritalStatus,
        })
        const newList = findfilteredResult({
            requireAgeFrom: userDetails.requireAgeFrom,
            requireAgeTo: userDetails.requireAgeTo,
            requireAnnualIncome: userDetails.requireAnnualIncome,
            requireFinalEducation: userDetails.requireFinalEducation,
            requireHeightFrom: userDetails.requireHeightFrom,
            requireHeightTo: userDetails.requireHeightTo,
            requireMaritalStatus: userDetails.requireMaritalStatus,
        }, eventDetails);
        setShowList(newList);
        if(newList.length===0){
            setMode(2);
            setShowList(eventDetails);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }else{
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        
    }, [eventDetails, userDetails]);
    return (
        <div className="heartbeat-container">
            <Modal
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={600}
                footer={null}
            >
                <div >
                    {mode === 3 ?
                        <EventIdArea
                            setShowList={setShowList}
                            eventDetails={eventDetails}
                            setOpen={setOpen}
                            setLoading={setLoading}
                        />
                        : mode === 4 ?
                            <RecommendArea
                                setShowList={setShowList}
                                eventDetails={eventDetails}
                                setOpen={setOpen}
                                standard={standard}
                                setStandard={setStandard}
                                setLoading={setLoading}
                            />
                            : <></>
                    }
                </div>
            </Modal>
            <ul>
                <li
                    className={isActive(mode, 1)}
                    onClick={() => {
                        setLoading(true);
                        setMode(1);
                        const newList = findfilteredResult({
                            requireAgeFrom: userDetails.requireAgeFrom,
                            requireAgeTo: userDetails.requireAgeTo,
                            requireAnnualIncome: userDetails.requireAnnualIncome,
                            requireFinalEducation: userDetails.requireFinalEducation,
                            requireHeightFrom: userDetails.requireHeightFrom,
                            requireHeightTo: userDetails.requireHeightTo,
                            requireMaritalStatus: userDetails.requireMaritalStatus,
                        }, eventDetails)
                        setShowList(newList);
                        setTimeout(() => {
                            if(newList.length===0){
                                message.warning('暂时没有推荐');
                            }
                            setLoading(false);
                        }, 500);
                    }}>
                    推荐
                </li>
                <li
                    className={isActive(mode, 2)}
                    onClick={() => {
                        setLoading(true);
                        setMode(2);
                        setShowList(eventDetails);
                        setTimeout(() => {
                            setLoading(false);
                        }, 500);
                    }}>
                    所有
                </li>
                <li
                    className={isActive(mode, 3)}
                    onClick={() => {
                        setMode(3);
                        setOpen(true);
                    }}>
                    番号
                </li>
                <li
                    className={isActive(mode, 4)}
                    onClick={() => {
                        setMode(4);
                        setOpen(true);
                    }}>
                    更多
                </li>
            </ul>
            <div className="profile-list">
                {
                    loading ? <div className="spin"><AppSpin /></div>
                        : showList.map((s: any, i: number) => (
                            <div key={i}>
                                <AppProfileCard
                                    detail={s}
                                />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
export default connect(
    (state: any) => ({
        eventDetails: state.InitializeObj.guestDetailsList,
        userDetails: state.InitializeObj.myDetails
    }),
    {}
)(Heartbeat);