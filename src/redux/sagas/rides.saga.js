import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createRide(action) {
  console.log(`help`)
  try {
    console.log(`in createRide of ride.saga.js with action.payload:`, action.payload);
    //   yield axios.post('/api/ride/create', action.payload);
  } catch (error) {
    console.log('Error creating ride.', error);
  }
}
// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchAllRides() {
  try {
    //const response = yield axios.get('api/ride/view/all-rides');
    console.log(`in fetchAllRides!`);
    const response = yield axios.get('/api/ride');
    yield put({ type: 'SET_RIDES', payload: response.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchUserRides(action) {
  //get all of the rides from the db
  try {
    console.log(`in fetchUserRides! User id is:`, action.payload)
    const rides = yield axios.get(`/api/ride/view/my-rides/${action.payload}`);
    console.log(`results for get all are:`, rides.data);
    yield put({ type: 'SET_RIDES', payload: rides.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

function* sendRideDetails(action) {
  console.log(`in sendRideDetails!`);
  try {
    yield put({ type: 'SET_RIDE_DETAILS', payload: action.payload });
  } catch (error) {
    console.log('Store ride details request failed', error);
  }
}

function* ridesSaga() {
  yield takeLatest('FETCH_ALL_RIDES', fetchAllRides);
  yield takeLatest('FETCH_USER_RIDES', fetchUserRides);
  yield takeLatest('CREATE_RIDE', createRide)
  yield takeLatest('SEND_RIDE_DETAILS', sendRideDetails);
}

export default ridesSaga;
