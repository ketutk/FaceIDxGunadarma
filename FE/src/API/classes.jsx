import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export const fetchAddClasses = async (data, token) => {
  return await axios.post(`${URL}/classes/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchAddClassesMeet = async (data, classes_id, token) => {
  return await axios.post(`${URL}/classes/meet/${classes_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchEditClasses = async (data, classes_id, token) => {
  return await axios.put(`${URL}/classes/${classes_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchNewestUserClasses = async (token) => {
  return await axios.get(`${URL}/classes/my/new`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchNewestLecturerClasses = async (token) => {
  return await axios.get(`${URL}/classes/lecturer/new`, {
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
export const fetchAllMyClasses = async (token, page) => {
  return await axios.get(`${URL}/classes/my?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchAllLecturerClasses = async (token) => {
  return await axios.get(`${URL}/classes/lecturer`, {
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
export const fetchDosenDetailClasses = async (classes_id, token) => {
  return await axios.get(`${URL}/classes/lecturer/${classes_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchDosenClassesMeet = async (classes_id, meet_id, token) => {
  return await axios.get(`${URL}/classes/lecturer/${classes_id}/${meet_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchAddPresence = async (data, token) => {
  return await axios.post(`${URL}/classes/presence`, data, {
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
export const fetchDeleteClasses = async (classes_id, token) => {
  return await axios.delete(`${URL}/classes/${classes_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
