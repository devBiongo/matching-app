const initState:{} = {status: ''}
const AuthReducer = (preState=initState,{type,payload}:any) => {
    switch(type){
        case "":
            return {status: payload}
        default:
            return preState
    }
}

export default AuthReducer;
