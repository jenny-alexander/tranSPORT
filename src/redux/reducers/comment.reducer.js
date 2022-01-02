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

export default commentReducer;
