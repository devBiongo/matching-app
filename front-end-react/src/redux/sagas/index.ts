
import EventService from '@/services/EventService';
import Constants from '@/utils/Constants'
import { call, put, throttle } from 'redux-saga/effects'


function* fetchinitializeInfo() {
  try {
    let result: { data: {} } = yield call(EventService.fetchInitializeInfo);
    yield put({ type: Constants.FETCH_INITIALIZE_INFO_SUCCESS, payload: result.data });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield throttle(2000, Constants.FETCH_INITIALIZE_INFO, fetchinitializeInfo);
}







