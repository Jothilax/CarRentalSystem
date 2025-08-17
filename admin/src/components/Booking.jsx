import React , { useEffect, useState } from 'react'
import styles from './booking.module.css';
import Navigation from './Navigation';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getBookings } from "../services/booking"; 

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   // Fetch booking data from backend
  //   axios
  //     .get("http://localhost:8000/carrentalapi/booking/getBooking") // change to your API URL
  //     .then((res) => {
  //       if (res.data.status) {
  //         setBookings(res.data.data);
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }, []);


  useEffect(() => {
    (async () => {
      try {
        const data = await getBookings();
        if (data.status) {
          setBookings(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.carList}>
    <div className={styles.navCol}><Navigation /></div>
    <div className={styles.carClm}>
      <div className={styles.bookingContainer}>
      <h2 className={styles.bookingHeading}>Booking List</h2>
      <table className={styles.bookingTable} >
        <thead className={styles.tableHeading}>
          <tr>
            <th>Booking No</th>
            <th>Car Model</th>
            <th>Variant</th>
            <th>Customer Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Total Days</th>
            <th>Total Rent</th>
            <th>Location</th>
            <th>Booking Approved</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.booking_no}</td>
              <td>{b.car?.carModel}</td>
              <td>{b.car?.variantName}</td>
              <td>{b.customer?.name}</td>                              
              <td>{new Date(b.fromDate).toLocaleDateString()}</td>
              <td>{new Date(b.toDate).toLocaleDateString()}</td>
              <td>{b.totalDays}</td>
              <td>₹{b.totalRent}</td>
              <td>{b.fromLocation} - {b.toLocation}</td>
              <td  onClick={() => navigate(`/updateBookingSts/${b._id}`)}>{b.bookingApproved ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  </div>
  )
}
