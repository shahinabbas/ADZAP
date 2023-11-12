import axios from "axios";
const baseURL = "http://127.0.0.1:8000";

export const login = (email, password) => async (dispatch) => {
  console.log("Starting login function from userAction",email,password);
  try {
    const response = await axios.post(
      baseURL+"/accounts/api/login/",
      {
        email,
        password,
      }
    );
    const userId = response.data.user.id; // Access user ID from the response
    console.log("User ID:", userId);

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

    dispatch({ type: "FETCH_USER_REQUEST" });

    dispatch(fetchUser(userId));

    console.log("login function completed successfully userAction");
  } catch (error) {
    console.error("Login error:", error);
    dispatch({ type: "USER_LOGIN_FAILURE", payload: error.message });
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  console.log(userId);
  try {
    if (userId) {
      const response = await axios.get(baseURL + `/admins/api/edit/${userId}/`);
      console.log("Fetching user success:", response.data);
      dispatch({ type: "FETCH_USER_SUCCESS", payload: response.data });
    } else {
      console.error("User ID is undefined");
    }
  } catch (error) {
    console.error("Fetching user error:", error);
    dispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
  }
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};