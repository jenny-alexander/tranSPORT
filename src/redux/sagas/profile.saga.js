import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PROFILE" actions
function* fetchProfile(action) {
  console.log(`in fetchProfile & action.payload is:`, action.payload);
  try {
    console.log(`about to do get axios call for profile`)
    const response = yield axios.get(`/api/profile/${action.payload}`);
    console.log(`response from get profile is:`, response.data)
    yield put({ type: 'SET_PROFILE', payload: response.data });
  } catch (error) {
    console.log('Profile get request failed.');
  }
}

function* profileSaga() {
  console.log(`about to trigger FETCH_PROFILE in profile saga`)
  yield takeLatest('FETCH_PROFILE', fetchProfile);
}

export default profileSaga;
