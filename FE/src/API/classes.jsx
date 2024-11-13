import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export const fetchMyClasses = async (token) => {
  return await axios.get(`${URL}/classes/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
