import axios from "axios";

// Base API URL
const API_URL = "http://localhost:8000/carrentalapi/customer";

// GET all cars
// export const getCustomerData = () => axios.get(`${API_URL}/getCustomer`);

// Signup
export const signupData = (form) =>
  axios.post(`${API_URL}/customerSignup`, form);

// Login
export const loginData = (form) =>
  axios.post(`${API_URL}/customerLogin`, form);

  export const getCustomerById = (token) =>
  axios.get(`${API_URL}/getCustomerByCustId`, {
    headers: { Authorization: `Bearer ${token}` },
  });