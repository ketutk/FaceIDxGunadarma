import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export const fetchNewestUserClasses = async (token) => {
  return await axios.get(`${URL}/classes/my/new`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchAllClasses = async (search, token) => {
  return await axios.get(`${URL}/classes/all?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchAllMyClasses = async (token) => {
  return await axios.get(`${URL}/classes/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMahasiswaDetailClasses = async (classes_id, token) => {
  return await axios.get(`${URL}/classes/${classes_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchJoinClasses = async (classes_id, token) => {
  return await axios.post(`${URL}/classes/join/${classes_id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
