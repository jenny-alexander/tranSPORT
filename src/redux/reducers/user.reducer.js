const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return [];
    case 'SET_PROFILE':
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
