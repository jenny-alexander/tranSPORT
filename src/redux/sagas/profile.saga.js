import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { useSelector } from 'react-redux';

// worker Saga: will be fired on "FETCH_PROFILE" actions
function* fetchProfile(action) {
  console.log(`in fetchProfile & action.payload is:`, action.payload);
  try {
    console.log(`about to do get axios call for profile`)
    const response = yield axios.get(`/api/profile/${action.payload}`);
    console.log(`response from get profile is:`, response.data)
    yield put({ type: 'SET_PROFILE', payload: response.data });
    console.log(`just did a call to SET_PROFILE'`)
  } catch (error) {
    console.log('Profile get request failed.');
  }
}

function* createProfile(action) {
  const user = useSelector(store => store.user);
  console.log(`in createProfile with action.payload:`, action.payload);
  try {
    console.log(`about to do axios call for post of new profile`);
    yield axios.post('/api/profile', action.payload);
  } catch (error) {
    console.log(`Create new profile failed.`);
  }
}

function* profileSaga() {
  console.log(`about to trigger FETCH_PROFILE in profile saga`)
  yield takeLatest('FETCH_PROFILE', fetchProfile);
  yield takeLatest('CREATE_PROFILE', createProfile);
}

export default profileSaga;
