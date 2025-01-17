import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export async function fetchStudent(search, page, token) {
  return await axios.get(`${URL}/student/?page=${page}&search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchStudentById(id, token) {
  return await axios.get(`${URL}/student/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchStudentClassPresences(id, classes_id, token) {
  return await axios.get(`${URL}/student/presences/${id}/${classes_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchStudentClassesById(id, page, token) {
  return await axios.get(`${URL}/student/classes/${id}?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
