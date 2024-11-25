import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export const fetchAllMajor = async (token) => {
  return await axios.get(`${URL}/major/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
