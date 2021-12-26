const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log(`in SET_USER with action.payload:`, action.payload)
      return action.payload;
    case 'UNSET_USER':
      return {};
    case 'SET_PROFILE':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
