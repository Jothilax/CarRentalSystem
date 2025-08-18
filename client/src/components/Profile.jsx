import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import styles from "./profile.module.css"; // create a new css file
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../services/customerService";

export default function Profile() {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchCustomer();
  // }, []);

  
  // const fetchCustomer = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get(
  //       "http://localhost:8000/carrentalapi/customer/getCustomerByCustId",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (res.data && res.data.data && res.data.data.length > 0) {
  //       setCustomer(res.data.data[0]); // API returns array
  //     }
  //   } catch (err) {
  //     console.error("Error fetching customer:", err);
  //   }
  // };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getCustomerById(token);

      if (res.data && res.data.data && res.data.data.length > 0) {
        setCustomer(res.data.data[0]); // ✅ API returns array
      }
    } catch (err) {
      console.error("Error fetching customer:", err);
    }
  };

  return (
    <div className={styles.profilePage}>
  <div className={styles.navCol}>
    <Navigation />
  </div>

  <div className={styles.profileClm}>
    <h2 className={styles.heading}>My Profile</h2>

    {customer ? (
      <div className={styles.card}>
        <div className={styles.formRow}>
          <label className={styles.label}>Name</label>
          <input className={styles.input} value={customer.name} disabled />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} value={customer.email} disabled />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>Phone</label>
          <input className={styles.input} value={customer.phoneNo} disabled />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>Aadhar No</label>
          <input className={styles.input} value={customer.adharNo} disabled />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>Address</label>
          <input className={styles.input} value={customer.address} disabled />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>City</label>
          <input className={styles.input} value={customer.city} disabled />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>State</label>
          <input className={styles.input} value={customer.state} disabled />
        </div>

        <div className={styles.formRow}>
          <label className={styles.label}>Country</label>
          <input className={styles.input} value={customer.country} disabled />
        </div>
      </div>
    ) : (
      <p>Loading profile...</p>
    )}
  </div>
</div>

  );
}
