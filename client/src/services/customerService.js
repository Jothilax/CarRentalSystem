import axios from "axios";

// Base API URL
const API_URL = "http://localhost:8000/carrentalapi/customer";

// GET all cars
export const getCustomerData = () => axios.get(`${API_URL}/getCustomer`);

// signup

export const signupData = () => axios.post(`${API_URL}/customerSignup`,form);


export const loginData = () => axios.post(`${API_URL}/customerLogin`,form);