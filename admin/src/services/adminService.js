import axios from "axios";

const API_URL = "http://localhost:8000/carrentalapi/admin";

// ✅ Admin Login API
export const adminLogin = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/adminlogin`, credentials);

    // store token if backend returns one
    if (res.data.token) {
      localStorage.setItem("adminToken", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};
