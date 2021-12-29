//rideReducer is the name of the store
const rideReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RIDES':
      return action.payload;
    case 'SET_RIDE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default rideReducer;
