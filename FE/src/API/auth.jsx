import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export async function fetchRegister(data) {
  return await axios.post(`${URL}/auth/register`, data);
}

export async function fetchLogin(data) {
  return await axios.post(`${URL}/auth/login`, data);
}

export async function fetchProfile(token) {
  return await axios.get(`${URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchChangePassword(token, data) {
  return await axios.put(`${URL}/auth/change/password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
