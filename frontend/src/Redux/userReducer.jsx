const initialState = {
  user: null,
  coins:0,
  is_authenticated: false,
  is_admin: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      console.log(action.payload.is_superuser,'shughugghyhu');
      return {
        ...state,
        user: action.payload,
        coins:action.payload.coins,
        is_authenticated: true,
        is_admin: action.payload.is_superuser,
        error: null,
      };
    case "FETCH_USER_FAILURE":
      return {
        ...state,
        user: null,
        coins:0,
        is_authenticated: false,
        is_admin: false,
        error: action.payload,
      };
    case "LOGOUT_USER":
      console.log("Logout Action Received");
      return {
        ...state,
        user: null,
        coins:0,
        is_authenticated: false,
        is_admin: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
