import axios from 'axios';
import { API_ROUTES } from './constant';

const BASE_URL = "https://ugive.com.au/api/"


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getUniversities = () => {
  return axiosInstance.get(`${API_ROUTES.GETUNIVERSITIES}`);
};

export const getColleges = (universityId) => {
  return axiosInstance.get(API_ROUTES.GETCOLLEGES(universityId));
};

export const registerStudent = (userData) => {
    return axiosInstance.post(API_ROUTES.STUDENTSIGNUP, userData)
}

export const loginAPI = userData => {
  return axiosInstance.post(API_ROUTES.STUDENTLOGIN, userData)
}