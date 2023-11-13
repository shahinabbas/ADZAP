# export const login = (email, password) => async (dispatch) => {
#   console.log("Starting login function from userAction", email, password);
#   try {
#     const response = await axios.post(
#       `${import.meta.env.VITE_APP_BASE_URL}accounts/api/login/`,
#       {
#         email,
#         password,
#       }
#     );
#     const userId = response.data.user.id; // Access user ID from the response
#     console.log("User ID:", userId);

#     dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

#     dispatch({ type: "FETCH_USER_REQUEST" });

#     dispatch(fetchUser(userId));

#     console.log("login function completed successfully userAction");
#   } catch (error) {
#     console.error("Login error:", error);
#     dispatch({ type: "USER_LOGIN_FAILURE", payload: error.message });
#   }
# };



# case "USER_LOGIN_SUCCESS":
#       return {
#         ...state,
#         user: action.payload.user,
#         is_authenticated: true,
#         is_admin: action.payload.user.is_superuser,
#         error: null,
#       };
#     case "USER_LOGIN_FAILURE":
#       return {
#         ...state,
#         user: null,
#         is_authenticated: false,
#         is_admin: false,
#         error: action.payload,
#       };




#       dispatch(login(email, password));

