import axios from "axios";
import api from "../services/api";

export const fetchUser = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/edit/${userId}/`
      );
      console.log("Fetching user success:", response.data);
      dispatch({ type: "FETCH_USER_SUCCESS", payload: response.data });
    } else {
    }
  } catch (error) {
    console.error("Fetching user error:", error);
    dispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
  }
};

export const NotificationData = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}chat/api/notification/${userId}/`
      );
      console.log("notificationdata", response);
      dispatch({
        type: "FETCH_NOTIFICATION_DATA_SUCCESS",
        payload: response.data,
      });
    } else {
    }
  } catch (error) {
    console.log("fetching notification error", error);
  }
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const setNotificationCount = (count) => {
  return {
    type: "SET_NOTIFICATION_COUNT",
    payload: count,
  };
};
