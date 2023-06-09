import axios from "axios";
export const token = import.meta.env.VITE_TOKEN;

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url, { headers: { token } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
