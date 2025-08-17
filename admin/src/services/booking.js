import axios from "axios";

// Base API URL
const API_URL = "http://localhost:8000/carrentalapi/booking";


export const getBookings = async () => {
  try {
    const res = await axios.get(`${API_URL}/getBooking`);
    return res.data; // Return API response
  } catch (err) {
    console.error("Error fetching bookings:", err);
    throw err; // Let the component handle errors if needed
  }
};

// ✅ Get booking by ID
export const getBookingById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/getBookingById/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching booking by ID:", err);
    throw err;
  }
};

// ✅ Update booking status
export const updateBookingStatus = async (id, bookingApproved) => {
  try {
    const payload = { bookingApproved: bookingApproved === "yes" };
    const res = await axios.put(`${API_URL}/updateBookingSts/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("Error updating booking:", err);
    throw err;
  }
};
