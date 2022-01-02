//rideReducer is the name of the store
const rideDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RIDE_DETAILS':
      return action.payload;
    case 'UNSET_RIDE_DETAILS':
      return {};
    default:
      return state;
  }
};

export default rideDetailsReducer;
