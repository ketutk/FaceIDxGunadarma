import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export async function fetchRegister(data) {
  return await axios.post(`${URL}/auth/register`, data);
}

export async function fetchLogin(data) {
  return await axios.post(`${URL}/auth/login`, data);
}
