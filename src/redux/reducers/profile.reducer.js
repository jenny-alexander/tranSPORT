const profileReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      console.log(`in SET_PROFILE reducer!!! with:`, action.payload)
      return action.payload;
    case 'UNSET_PROFILE':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default profileReducer;
