//rideReducer is the name of the store
const ridesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RIDES':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default ridesReducer;
