import axios from "axios";


export const fetchUser = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}admins/api/edit/${userId}/`);
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
