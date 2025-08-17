import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import styles from "./addBookings.module.css";
import axios from "axios";
import { getCars } from "../services/CarService";
import { addBooking } from "../services/BookingService";

export default function AddBooking() {
  const { car_id } = useParams(); // ✅ get car_id from URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [booking, setBooking] = useState({
    fromDate: "",
    toDate: "",
    fromLocation: "",
    toLocation: "",
  });

  // Fetch single car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await getCars(); // fetch all cars
        const selected = res.data.find((c) => c._id === car_id); // filter
        setCar(selected);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCar();
  }, [car_id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const token = localStorage.getItem("token");
  
  //     const res = await axios.post(
  //       "http://localhost:8000/carrentalapi/booking/addbooking",
  //       {
  //         car_id: car_id,             // ✅ from useParams
  //         fromDate: booking.fromDate, // ✅ from state
  //         toDate: booking.toDate,
  //         fromLocation: booking.fromLocation,
  //         toLocation: booking.toLocation,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  
  //     console.log("Booking success:", res.data);
  //     alert("Booking Confirmed!");
  //     navigate("/bookings"); // redirect if you want
  //   } catch (err) {
  //     console.error("Booking failed:", err);
  //     alert("Booking failed. Please login again.");
  //   }
  // };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await addBooking(
        {
          car_id: car_id,
          fromDate: booking.fromDate,
          toDate: booking.toDate,
          fromLocation: booking.fromLocation,
          toLocation: booking.toLocation,
        },
        token
      );

      console.log("Booking success:", res.data);
      alert("Booking Confirmed!");
      navigate("/bookings");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please login again.");
    }
  };

  return (
    <div className={styles.carList}>
      <div className={styles.navCol}><Navigation/></div>
      <div className={styles.carClm}>
        {car ? (
          <div className={styles.card}>
            <img src={car.img[0]} alt={car.carModel} className={styles.image} />
            <h2>{car.carModel}</h2>
            <p>{car.variantName} | {car.fuel} | ₹{car.rentPreDay}/day</p>
          </div>
        ) : (
          <p>Loading car details...</p>
        )}

        <form onSubmit={handleSubmit} className={styles.bookingForm}>
          <label>From Date:</label>
          <input type="date" name="fromDate" onChange={handleChange} required />

          <label>To Date:</label>
          <input type="date" name="toDate" onChange={handleChange} required />

          <label>From Location:</label>
          <input type="text" name="fromLocation" onChange={handleChange} required />

          <label>To Location:</label>
          <input type="text" name="toLocation" onChange={handleChange} required />

          {/* <label>Total Payment:</label>
          <input type="text" name="toLocation" onChange={handleChange} required /> */}


          <button type="submit" className={styles.bookingBtn}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}
