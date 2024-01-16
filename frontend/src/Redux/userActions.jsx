import axios from "axios";
import api from "../services/api"

export const fetchUser = (userId) => async (dispatch) => {
  try {
    console.log("Fetching user...");
    if (userId) {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/edit/${userId}/`
      );
      dispatch({ type: "FETCH_USER_SUCCESS", payload: response.data });
    } else {
      console.log('No userId provided.');
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
      dispatch({
        type: "FETCH_NOTIFICATION_DATA_SUCCESS",
        payload: [],
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

export const setSelectedChatUser = (user) => {
  return {
    type: "SET_SELECTED_CHAT_USER",
    payload: user,
  };
};

export const fetchCount = () => async (dispatch) => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_APP_BASE_URL}chat/api/count/`
    );
    const count = response.data;
    console.log(count, "888888888888888888");
    dispatch({
      type: "FETCH_NOTIFICATION_COUNT_SUCCESS",
      payload: count,
    });
  } catch (error) {
    console.log(error);
  }
};
