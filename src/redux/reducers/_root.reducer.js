import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import rides from './rides.reducer';
import comment from './comment.reducer';
import rideDetails from './rideDetails.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  rides,
  rideDetails,
  comment,
});

export default rootReducer;
