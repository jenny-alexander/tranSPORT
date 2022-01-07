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
    //Store the ride ID in session storage to be used by CreateRideForm and using history.push to 
    //go to ride details page with ride id in the URL.
    // myStorage.clear();
    // myStorage.setItem('ride_id', response.data.ride_id);
    console.log(`about to store ride id with response:`, response.data);
    yield put({
      type: 'UPDATE_SESSION_STORAGE', payload: {
        key: 'ride_id',
        value: response.data.ride_id
      }
    });
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

function* fetchRideByID(action) {
  console.log(`in fetchRideByID saga with action:`, action)
  try {
    yield put({ type: 'UNSET_RIDE_DETAILS' });
    const response = yield axios.get(`/api/ride/${action.payload}`);
    yield put({ type: 'SET_RIDE_DETAILS', payload: response.data[0] });
  } catch (error) {
    console.log('Ride GET RIDE BY ID request failed', error);
  }
}

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

function* removeDriverFromRide(action) {
  try {
    yield axios.put(`api/ride/remove-driver`, action.payload)
  } catch (error) {
    console.log('Removal of driver failed!', error);
  }
  yield put({
    type: 'UPDATE_SESSION_STORAGE', payload: {
      key: 'driver_name',
      value: ''
    }
  });
}

function* updateRideWithDriver(action) {
  console.log(`action.payload is:`, action.payload)
  try {
    yield axios.put(`api/ride/assign-ride`, action.payload)
  } catch (error) {
    console.log(`Ride UPDATE request failed.`);
  }
  // yield put({
  //   type: 'UPDATE_SESSION_STORAGE', payload: {
  //     key: 'ride_id',
  //     value: action.payload.rideID
  //   }
  // });
}

// function* updateSessionStorage(action) {
//   let myStorage = window.sessionStorage;
//   myStorage.removeItem(action.payload.key);
//   myStorage.setItem(action.payload.key, action.payload.value);
// }

function* ridesSaga() {
  yield takeLatest('CREATE_RIDE', createRide)
  yield takeLatest('DELETE_RIDE_REQUEST', deleteRideRequest)
  yield takeLatest('FETCH_ALL_RIDES', fetchAllRides);
  yield takeLatest('FETCH_MY_RIDES', fetchMyRides);
  yield takeLatest('FETCH_RIDE_BY_ID', fetchRideByID);
  yield takeLatest('UPDATE_RIDE_WITH_DRIVER', updateRideWithDriver);
  yield takeLatest('REMOVE_DRIVER_FROM_RIDE', removeDriverFromRide);
  //yield takeLatest('UPDATE_SESSION_STORAGE', updateSessionStorage);

}

export default ridesSaga;
