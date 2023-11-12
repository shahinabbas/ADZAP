  const initialState = {
    user: null,
    error: null,
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_LOGIN_SUCCESS":
        return {
          ...state,
          user: action.payload.user,
          error: null,
        };
      case "USER_LOGIN_FAILURE":
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      case "FETCH_USER_SUCCESS":
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case "FETCH_USER_FAILURE":
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      case "LOGOUT_USER":
        return {
          ...state,
          user: null,
          error: null,
        };
      default:
        return state;
    }
  };

  export default userReducer;
