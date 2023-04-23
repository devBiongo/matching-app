import Constants from "@/utils/Constants"
const initState: {} = {
    status: '',
    myDetails: {},
    guestDetailsList: []
}
const EventDetailsReducer = (preState = initState, { type, payload }: any) => {
    switch (type) {
        case Constants.FETCH_INITIALIZE_INFO_SUCCESS:
            return {
                status: payload.status,
                myDetails: payload.myDetails,
                guestDetailsList: payload.guestDetailsList,
            }
        default:
            return preState
    }
}

export default EventDetailsReducer;
