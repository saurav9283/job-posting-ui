import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const registerCompany = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const verifyEmailOtp = (data) => axios.post(`${API_URL}/otp/verify-email`, data);
export const verifyMobileOtp = (data) => axios.post(`${API_URL}/otp/verify-phone`, data);
export const createJob = (data) => axios.post(`${API_URL}/jobs`, data);
// export const loginCompany = (data) => axios.post(`${API_URL}/login`, data);
export const postJob = (data, token) =>
  axios.post(`${API_URL}/jobs`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
