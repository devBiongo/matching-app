import AppHeader from "@/common/AppHeader";
import Closed from "@/common/Closed";
import Loading from "@/common/Loading";
import { fetchInitializeInfo } from "@/redux/actions/Event";
import { SyncOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

const containerStyle = { backgroundColor: '#F5F5F5', minHeight: '100vh', maxWidth: 700 }
const contentStyle = {  }

const Layout = ({ initializeObj, fetchInitializeInfo }: any) => {
    useEffect(() => {
        if (!initializeObj.status) {
            fetchInitializeInfo();
        }
    }, [initializeObj, fetchInitializeInfo]);
    return (
        <div style={containerStyle}>
            {initializeObj.status==='' ?<Loading/>:initializeObj.status !== '88' ?(
                <>
                    <FloatButton
                        icon={<SyncOutlined />}
                        onClick={() => {
                            window.location.reload();
                        }}
                    />
                    <AppHeader UserDetails={initializeObj.myDetails} status={initializeObj.status}/>
                    <div style={contentStyle}>
                        <Outlet />
                    </div>
                </>
            ):<Closed/>}
        </div>
    )
}

export default connect(
    (state: any) => ({
        initializeObj: state.InitializeObj
    }),
    { fetchInitializeInfo }
)(Layout);