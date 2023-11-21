import api from "./api";

export const fetchCategory = async () => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_APP_BASE_URL}admins/api/category-list/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};


export const fetchBox = async (userId) => {
  try {
    const res = await api.get(
      `${import.meta.env.VITE_APP_BASE_URL}admins/api/box/`,
      {
        params: {
          userId: userId,
        },
      }
      );
      console.log(res.data,'kuaew');
      return res
    } catch (error) {
      console.log(error);
    }
  };