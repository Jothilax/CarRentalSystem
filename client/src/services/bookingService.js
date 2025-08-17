import axios from "axios";

// Base API URL
const API_URL = "http://localhost:8000/carrentalapi/booking";

// ✅ Add a new booking
export const addBooking = (bookingData, token) =>
  axios.post(`${API_URL}/addbooking`, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // ✅ Get all bookings for the logged-in customer
export const getBookingsByCustomer = (token) =>
axios.get(`${API_URL}/getBookingByCustId`, {
  headers: { Authorization: `Bearer ${token}` },
});