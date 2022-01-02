import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createRide(action) {
  try {
    const response = yield axios.post('/api/ride/create', action.payload);
    //Now create the comment for this ride
    yield put({
      type: 'CREATE_RIDE_COMMENT', payload: {
        rideID: response.data.ride_id,
        creatorID: action.payload.creatorId,
        comment: action.payload.comment
      }
    })
  } catch (error) {
    console.log('Error creating ride.', error);
  }
}

function* deleteRideRequest(action) {
  try {
    yield axios.delete(`api/ride/delete/${action.payload}`);
  } catch (error) {
    console.log(`Error deleting ride request.`, error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchAllRides() {
  try {
    yield put({ type: 'UNSET_RIDES' });
    //const response = yield axios.get('api/ride/view/all-rides');
    const response = yield axios.get('/api/ride');
    yield put({ type: 'SET_RIDES', payload: response.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchRideByID(action) {
  try {
    yield put({ type: 'UNSET_RIDE_DETAILS' });
    const response = yield axios.get(`/api/ride/${action.payload}`);
    yield put({ type: 'SET_RIDE_DETAILS', payload: response.data[0] });
  } catch (error) {
    console.log('Ride GET RIDE BY ID request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_RIDES" actions
function* fetchMyRides(action) {
  //get all of the rides from the db
  try {
    yield put({ type: 'UNSET_RIDES' });
    const response = yield axios.get(`/api/ride/view/my-rides/${action.payload}`);
    yield put({ type: 'SET_RIDES', payload: response.data });
  } catch (error) {
    console.log('Ride GET request failed', error);
  }
}

function* updateRideWithDriver(action) {
  try {
    yield axios.put(`api/ride/assign-ride`, action.payload)
  } catch (error) {
    console.log(`Ride UPDATE request failed.`);
  }
}

function* ridesSaga() {
  yield takeLatest('CREATE_RIDE', createRide)
  yield takeLatest('DELETE_RIDE_REQUEST', deleteRideRequest)
  yield takeLatest('FETCH_ALL_RIDES', fetchAllRides);
  yield takeLatest('FETCH_MY_RIDES', fetchMyRides);
  yield takeLatest('FETCH_RIDE_BY_ID', fetchRideByID);
  yield takeLatest('UPDATE_RIDE_WITH_DRIVER', updateRideWithDriver);
}

export default ridesSaga;
