import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import styles from "./updateBookingSts.module.css";
import axios from "axios";
import { getBookingById, updateBookingStatus } from "../services/booking"; 


export default function UpdateBookingSts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    booking_no: "",
    carModel: "",
    variantName: "",
    rentPreDay: "",
    configurations: "",
    img: [],
    name: "",
    phoneNo: "",
    address: "",
    fromDate: "",
    toDate: "",
    totalDays: "",
    totalRent: "",
    bookingApproved: "no",
    fromLocation: "",
    toLocation: ""
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getBookingById(id);
        const data = res.data;
        setFormData({
          booking_no: data.booking_no || "",
          carModel: data.car?.carModel || "",
          variantName: data.car?.variantName || "",
          rentPreDay: data.car?.rentPreDay || "",
          configurations: data.car?.configurations || "",
          img: data.car?.img || [],
          name: data.customer?.name || "",
          phoneNo: data.customer?.phoneNo || "",
          address: data.customer?.address || "",
          fromDate: data.fromDate ? new Date(data.fromDate).toLocaleDateString() : "",
          toDate: data.toDate ? new Date(data.toDate).toLocaleDateString() : "",
          totalDays: data.totalDays || "",
          totalRent: data.totalRent || "",
          bookingApproved: data.bookingApproved ? "yes" : "no",
          fromLocation: data.fromLocation || "",
          toLocation: data.toLocation || ""
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, bookingApproved: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBookingStatus(id, formData.bookingApproved);
      alert("Booking updated successfully!");
      navigate("/bookings");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.pageLayout}>
      <div className={styles.navCol}>
        <Navigation />
      </div>
      <div className={styles.carClm}>
        <h2 className={styles.carDetailsHeader}>Booking Details</h2>
        <form onSubmit={handleSubmit} className={styles.updateBookSts}>
          {/* Row 1 */}
          <div className={styles.row1}>
            <div className={styles.formElement}>
              <label>Booking No</label>
              <input type="text" value={formData.booking_no} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Car Model</label>
              <input type="text" value={formData.carModel} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Variant Name</label>
              <input type="text" value={formData.variantName} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Rent Per Day</label>
              <input type="text" value={formData.rentPreDay} readOnly />
            </div>
          </div>

          {/* Row 2 */}
          <div className={styles.row1}>
            <div className={styles.formElement}>
              <label>Customer Name</label>
              <input type="text" value={formData.name} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Phone No</label>
              <input type="text" value={formData.phoneNo} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Address</label>
              <input type="text" value={formData.address} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Configurations</label>
              <input type="text" value={formData.configurations} readOnly />
            </div>
          </div>

          {/* Row 3 */}
          <div className={styles.row1}>
            <div className={styles.formElement}>
              <label>From Date</label>
              <input type="text" value={formData.fromDate} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>To Date</label>
              <input type="text" value={formData.toDate} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Total Days</label>
              <input type="text" value={formData.totalDays} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Total Rent</label>
              <input type="text" value={formData.totalRent} readOnly />
            </div>
          </div>

          {/* Row 4 */}
          <div className={styles.row1}>
            <div className={styles.formElement}>
              <label>From Location</label>
              <input type="text" value={formData.fromLocation} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>To Location</label>
              <input type="text" value={formData.toLocation} readOnly />
            </div>
            <div className={styles.formElement}>
              <label>Booking Approved</label>
              <select value={formData.bookingApproved} onChange={handleChange}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Image & Button */}
          <div className={styles.imgbtn}>
            <div className={styles.imageDiv}>
              {formData.img.length > 0 && (
                <img
                  className={styles.carimg}
                  src={` https://carrentalsystembackend-w0jf.onrender.com/${formData.img[0]}`}
                  alt="Car"
                />
              )}
            </div>
            <div className={styles.addCarBtn}>
              <button type="submit" className={styles.carBtn}>
                Update Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
