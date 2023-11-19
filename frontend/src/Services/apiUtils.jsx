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
