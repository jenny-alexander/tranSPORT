import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createRideComment(action) {
  try {
    yield axios.post('api/comment/create', action.payload)
  } catch (error) {
    console.log(`Error creating ride comment.`, error);
  }
}

function* fetchRideComments(action) {
  try {
    const response = yield axios.get(`/api/comment/${action.payload}`);
    yield put({ type: 'SET_RIDE_COMMENTS', payload: response.data });
  } catch (error) {
    console.log('Error getting ride comments', error);
  }
}

function* commentSaga() {
  yield takeLatest('FETCH_RIDE_COMMENTS', fetchRideComments);
  yield takeLatest('CREATE_RIDE_COMMENT', createRideComment);
}

export default commentSaga;
