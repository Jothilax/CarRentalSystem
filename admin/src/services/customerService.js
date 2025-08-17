import axios from "axios";

// Base API URL
const API_URL = "http://localhost:8000/carrentalapi/customer";

// GET all cars
export const getCustomerData = () => axios.get(`${API_URL}/getCustomer`);