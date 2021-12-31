import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { useSelector, useDispatch } from 'react-redux';

function* createRide(action) {
  try {
    console.log(`in createRide of ride.saga.js with action.payload:`, action.payload);
    yield axios.post('/api/ride/create', action.payload);
  } catch (error) {
    console.log('Error creating ride.', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchAllRides() {
  try {
    yield put({ type: 'UNSET_RIDES' });
    //const response = yield axios.get('api/ride/view/all-rides');
    console.log(`in fetchAllRides!`);
    const response = yield axios.get('/api/ride');
    yield put({ type: 'SET_RIDES', payload: response.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchMyRides(action) {
  //get all of the rides from the db
  try {
    yield put({ type: 'UNSET_RIDES' });
    console.log(`in fetchMyRides! User id is:`, action.payload)
    const response = yield axios.get(`/api/ride/view/my-rides/${action.payload}`);
    yield put({ type: 'SET_RIDES', payload: response.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

function* fetchRideDetails(action) {
  console.log(`in fetchRideDetails!`);
  console.log(`action is`, action)

  try {
    console.log(`about to SET_RIDE_DETAILS with action.payload:`, action.payload);
    yield put({ type: 'SET_RIDE_DETAILS', payload: action.payload });
  } catch (error) {
    console.log('Store ride details request failed', error);
  }
}

function* updateRideWithDriver(action) {
  console.log(`in updateRideWithDriver!`);
  console.log(`action.payload is:`, action.payload)
  try {
    yield axios.put(`api/ride/assign-ride`, action.payload)
  } catch (error) {
    console.log(`Ride UPDATE request failed.`);
  }
}

function* ridesSaga() {
  yield takeLatest('FETCH_ALL_RIDES', fetchAllRides);
  yield takeLatest('FETCH_MY_RIDES', fetchMyRides);
  yield takeLatest('CREATE_RIDE', createRide)
  yield takeLatest('FETCH_RIDE_DETAILS', fetchRideDetails);
  yield takeLatest('UPDATE_RIDE_WITH_DRIVER', updateRideWithDriver);
}

export default ridesSaga;
