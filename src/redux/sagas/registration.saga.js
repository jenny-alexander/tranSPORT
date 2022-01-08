import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    //Check that they have an email in 'team' table before trying to login  
    const response = yield axios.get(`/api/user/check-email/${action.payload.userProfile.email}`);
    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);
    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    yield put({ type: 'USER_NOT_REGISTERED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
