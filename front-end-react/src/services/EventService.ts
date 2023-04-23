import axios from '../configs/api'

const EventService = {
    doEventInfoRegis: (values: any) => {
        const params = {
            realName: values.realName,
            annualIncome: values.annualIncome,
            myBirthday: values.birthday,
            birthplace: values.birthplace,
            finalEducation: values.finalEducation,
            visaType: values.visaType,
            wechatNum: values.wechatNum,
            gender: values.gender,
            height: values.height,
            maritalStatus: values.maritalStatus,
            occupation: values.occupation,
            phoneNum: values.phoneNum,
            privateFlag: values.privateFlag,
            avatarId: values.avatarId,
            residence: values.residence,
            selfIntroduction: values.selfIntroduction,
            requireAgeFrom: values.requireAgeFrom,
            requireAgeTo: values.requireAgeTo,
            requireAnnualIncome: values.requireAnnualIncome,
            requireFinalEducation: values.requireFinalEducation,
            requireHeightFrom: values.requireHeightFrom,
            requireHeightTo: values.requireHeightTo,
            requireMaritalStatus: values.requireMaritalStatus,
            requireNuisance: values.requireNuisance
        }
        return axios.post('/event/eventInfoRegis', params);
    },
    doEventInfoUpdate: (values: any) => {
        const params = {
            realName: values.realName,
            annualIncome: values.annualIncome,
            myBirthday: values.birthday,
            birthplace: values.birthplace,
            finalEducation: values.finalEducation,
            visaType: values.visaType,
            wechatNum: values.wechatNum,
            gender: values.gender,
            height: values.height,
            maritalStatus: values.maritalStatus,
            occupation: values.occupation,
            phoneNum: values.phoneNum,
            privateFlag: values.privateFlag,
            avatarId: values.avatarId,
            residence: values.residence,
            selfIntroduction: values.selfIntroduction,
            requireAgeFrom: values.requireAgeFrom,
            requireAgeTo: values.requireAgeTo,
            requireAnnualIncome: values.requireAnnualIncome,
            requireFinalEducation: values.requireFinalEducation,
            requireHeightFrom: values.requireHeightFrom,
            requireHeightTo: values.requireHeightTo,
            requireMaritalStatus: values.requireMaritalStatus,
            requireNuisance: values.requireNuisance
        }
        console.log(111,params.myBirthday)
        return axios.post('/event/myEventInfoUpdate', params);
    },
    fetchEventDetails: () => {
        return axios.get('/event/loadHeterosexualDetails').then((res)=>{
            return res.data
        });
    },
    fetchInitializeInfo: () => {
        return axios.get('/event/loadInitializeInfo');
    },
    fetchMyChatList: () => {
        return axios.get('/event/loadMyChatList');
    },
    doEditReply: (initiatorId: string, targetId: string, reply: string) => {
        return axios.post('/event/editReply',{initiatorId,targetId,reply});
    },
    doTextHer: (targetId: string, message: string) => {
        return axios.post('/event/textHer',{targetId,message});
    },
    doFetchReplyInfo: () => {
        return axios.get('/event/getReplyInfo');
    },
    doFetchMyEventInfo: () => {
        return axios.get('/event/getMyEventInfo');
    },
    getSelectableGuests: () => {
        return axios.get('/event/getSelectableGuests');
    },
    selectSweetHearts: (sweetHeartIds: string) => {
        return axios.post('/event/selectSweetHearts',{sweetHeartIds});
    },
    fetchWhoSelectdMe: () => {
        return axios.get('/event/loadListWhoSelectedMe');
    },
    replyGuestWhoSelectedMe: (initiatorId:string,replyFlag:string) => {
        return axios.post('/event/replyGuestWhoSelectedMe',{initiatorId,replyFlag});
    },
}

export default EventService;