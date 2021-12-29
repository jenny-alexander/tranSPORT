import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    //---> BEGIN NEW
    console.log(`@ line 10 and action.payload is:`, action.payload)
    //Check that they have an email in 'team' table before trying to login  
    yield axios.get(`/api/user/check-email/${action.payload.userProfile.email}`);
    //<--- END NEW
    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // //---> BEGIN NEW
    // console.log(`line 18 of registration.saga & action.payload is:`, action.payload);
    // //create the user profile
    // yield put({ type: 'CREATE_PROFILE', payload: action.payload });
    // //<--- END NEW

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
