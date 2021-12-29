import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { useSelector } from 'react-redux';

function* createProfile(action) {
  console.log(`in createProfile with action.payload:`, action.payload);
  try {
    console.log(`about to do axios call for post of new profile`);
    yield axios.post('/api/profile', action.payload);
  } catch (error) {
    console.log(`Create new profile failed.`);
  }
}

function* fetchUserProfile(action) {
  console.log(`in fetchProfile & action.payload is:`, action.payload);
  try {
    console.log(`about to do get axios call for profile`)
    const response = yield axios.get(`/api/profile/${action.payload}`);
    console.log(`response from get profile is:`, response.data)
    yield put({ type: 'SET_PROFILE', payload: response.data });
    console.log(`just did a call to SET_PROFILE'`)
  } catch (error) {
    console.log(`Profile get request failed.`, error);
  }
}

function* updateUserProfile(action) {
  console.log(`in updateProfile with action.payload:`, action.payload);
  try {
    const response = yield axios.put(`api/profile/${action.payload.userProfile.id}`)
    console.log(`repsonse from PUT is:`, response.data);
    yield put({ type: 'SET_PROFILE', payload: response.data });
  } catch (error) {
    console.log(`Profile update request failed.`, error);
  }
}

function* profileSaga() {
  console.log(`about to trigger FETCH_PROFILE in profile saga`)
  yield takeLatest('FETCH_PROFILE', fetchUserProfile);
  yield takeLatest('CREATE_PROFILE', createProfile);
  yield takeLatest('UPDATE_USER_PROFILE', updateUserProfile);
}

export default profileSaga;
