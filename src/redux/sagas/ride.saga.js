import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchAllRides() {
  try {
    const response = yield axios.get('api/ride/view/all-rides');
    yield put({ type: 'SET_RIDES', payload: response.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchUserRides() {
  try {
    const response = yield axios.get('api/ride/view/my-rides');
    yield put({ type: 'SET_RIDES', payload: response.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

function* rideSaga() {
  yield takeLatest('FETCH_ALL_RIDES', fetchAllRides);
}

export default rideSaga;
