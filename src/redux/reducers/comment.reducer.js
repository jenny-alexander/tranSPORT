const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RIDE_COMMENTS':
      return action.payload;
    case 'UNSET_RIDE_COMMENTS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default commentReducer;
