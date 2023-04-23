import Constants from "@/utils/Constants";

export const fetchInitializeInfo = (payload: any) => ({
    type: Constants.FETCH_INITIALIZE_INFO,
    payload,
})