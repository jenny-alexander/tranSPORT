//rideReducer is the name of the store
const ridesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RIDES':
      return action.payload;
    case 'UNSET_RIDES':
      return [];
    default:
      return state;
  }
};

export default ridesReducer;
