import axios from "axios";

// Base API URL
const API_URL = "https://carrentalsystembackend-w0jf.onrender.com/carrentalapi/customer";

// GET all cars
export const getCustomerData = () => axios.get(`${API_URL}/getCustomer`);
