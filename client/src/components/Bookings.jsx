import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import styles from "./booking.module.css";
import { useNavigate } from "react-router-dom";
import { getBookingsByCustomer } from "../services/BookingService";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         "http://localhost:8000/carrentalapi/booking/getBookingByCustId",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setBookings(res.data.bookings || []);
//       console.log("Full API Response:", res.data);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     }
//   };

// const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         "http://localhost:8000/carrentalapi/booking/getBookingByCustId",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Full API Response:", res.data);
//       setBookings(res.data || []); // ✅ Fixed: backend sends array directly
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     }
//   };

useEffect(() => {
  fetchBookings();
}, []);

const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await getBookingsByCustomer(token);

    console.log("Full API Response:", res.data);
    setBookings(res.data || []); // ✅ backend sends array directly
  } catch (err) {
    console.error("Error fetching bookings:", err);
  }
};

  return (
    <div className={styles.carList}>
      <div className={styles.navCol}>
        <Navigation />
      </div>
      <div className={styles.carClm}>
        <h3>Your Bookings</h3>

        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map((b, index) => (
            <form key={index} className={styles.bookingForm}>

              <h4>Booking No: {b.booking_no}</h4>

            <div className={styles.row1}>
            <div className={styles.formElement}>
                <label className={styles.formLabel}>Car Model</label>
                <input className={styles.formInputData} type="text" value={b.car_id?.carModel || ""} readOnly />
                </div>
              
                <div className={styles.formElement}>
              <label className={styles.formLabel}>Variant</label>
              <input className={styles.formInputData} type="text" value={b.car_id?.variantName || ""} readOnly /></div>

              <div className={styles.formElement}>
              <label className={styles.formLabel}>Engine</label>
              <input className={styles.formInputData} type="text" value={b.car_id?.engine || ""} readOnly /></div>

              <div className={styles.formElement}>
              <label className={styles.formLabel}>Fuel</label>
              <input className={styles.formInputData} type="text" value={b.car_id?.fuel || ""} readOnly /></div>
                
                </div>

                <div className={styles.row1}>
              <div className={styles.formElement}>
              <label className={styles.formLabel}>Mileage</label>
              <input className={styles.formInputData} type="text" value={b.car_id?.mileage || ""} readOnly /></div>

              <div className={styles.formElement}>
              <label className={styles.formLabel}>Power</label>
              <input className={styles.formInputData} type="text" value={b.car_id?.power || ""} readOnly /></div>


              <div className={styles.formElement}>
              <label className={styles.formLabel}>Transmission</label>
              <input className={styles.formInputData} type="text" value={b.car_id?.transmission || ""} readOnly /></div>

              <div className={styles.formElement}>
              <label className={styles.formLabel}>Rent/Day</label>
              <input className={styles.formInputData}
                type="text"
                value={`₹${b.car_id?.rentPreDay || 0}`}
                readOnly
              /></div> 
            </div>

            <div className={styles.row1}>

<div className={styles.formElement}>
  <label className={styles.formLabel}>From Date</label>
  <input className={styles.formInputData}
    type="text"
    value={
      b.fromDate
        ? new Date(b.fromDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : ""
    }
    readOnly
  /></div>

<div className={styles.formElement}>
  <label className={styles.formLabel}>To Date</label>
  <input className={styles.formInputData}
    type="text"
    value={
      b.toDate
        ? new Date(b.toDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : ""
    }
    readOnly
  /></div>

<div className={styles.formElement}>
  <label className={styles.formLabel}>From Location</label>
  <input className={styles.formInputData} type="text" value={b.fromLocation || ""} readOnly /></div>

  <div className={styles.formElement}>
  <label className={styles.formLabel}>To Location</label>
  <input className={styles.formInputData} type="text" value={b.toLocation || ""} readOnly /></div>



 


</div>

<div className={styles.row1}>
            <div className={styles.formElement}>
              <label className={styles.formLabel}>Configurations</label>
              <textarea className={styles.formInputDataT} value={b.car_id?.configurations || ""} readOnly /></div>

           <div className={styles.formElement}>
              <label className={styles.formLabel}>Description</label>
              <textarea className={styles.formInputDataT} value={b.car_id?.description || ""} readOnly /></div>
          
              <div className={styles.formElement}>
              <label className={styles.formLabel}>Total Days</label>
              <input className={styles.formInputData} type="text" value={b.totalDays || ""} readOnly /></div>

              </div>
            
            {/* <div className={styles.row1}>
                
            <div className={styles.formElement}>
              <label className={styles.formLabel}>Total Rent</label>
              <input className={styles.formInputData} type="text" value={`₹${b.totalRent || 0}`} readOnly /></div>


<div className={styles.formElement}>
  <label className={styles.formLabel}>Booking Approved</label>
  <input
    className={`${styles.formInputData} ${
      b.bookingApproved === true
        ? styles.approved
        : b.bookingApproved === false
        ? styles.rejected
        : styles.pending
    }`}
    type="text"
    value={
      b.bookingApproved === true
        ? "Approved - Enjoy Your Ride"
        : b.bookingApproved === false
        ? "Rejected"
        : "Pending"
    }
    readOnly
  />
</div>


        

<div className={styles.formElement}>
  <div className={styles.formInputData}>
    {b.car_id?.img?.length > 0 ? (
      b.car_id.img.map((imagePath, i) => (
        <img
          key={i}
          src={`http://localhost:8000/${imagePath.replace(/\\/g, "/")}`}
          alt={`car-${i}`}
        />
      ))
    ) : (
      <p>No images available</p>
    )}
  </div>
</div>



            </div> */}
            

        
            <div className={styles.lastRow}>
  {/* Total Rent */}
  <div className={styles.formElement}>
    <label className={styles.formLabel}>Total Rent</label>
    <input
      className={styles.formInputData}
      type="text"
      value={`₹${b.totalRent || 0}`}
      readOnly
    />
  </div>

  {/* Booking Approved */}
  <div className={styles.formElement}>
    <label className={styles.formLabel}>Booking Approved</label>
    <input
      className={`${styles.formInputData} ${
        b.bookingApproved === true
          ? styles.approved
          : b.bookingApproved === false
          ? styles.rejected
          : styles.pending
      }`}
      type="text"
      value={
        b.bookingApproved === true
          ? "Approved - Enjoy Your Ride"
          : b.bookingApproved === false
          ? "Rejected"
          : "Pending"
      }
      readOnly
    />
  </div>

  {/* Car Images */}
  <div className={styles.formElement}>
    <label className={styles.formLabel}>Car Images</label>
    <div className={styles.imageGallery}>
      {b.car_id?.img?.length > 0 ? (
        b.car_id.img.map((imagePath, i) => (
          <img
            key={i}
            src={`http://localhost:8000/${imagePath.replace(/\\/g, "/")}`}
            alt={`car-${i}`}
          />
        ))
      ) : (
        <p>No images available</p>
      )}
    </div>
  </div>
</div>

         
          

            

              <hr />
            </form>
          ))
        )}
      </div>
    </div>
  );
}
