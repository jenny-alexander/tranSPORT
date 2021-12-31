import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import ridesSaga from './rides.saga';
import commentSaga from './comment.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    ridesSaga(),
    commentSaga()
  ]);
}
