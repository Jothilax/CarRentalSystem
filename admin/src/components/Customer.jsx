import React, { useEffect, useState }  from 'react'
import styles from './customer.module.css';
import Navigation from './Navigation';
import axios from "axios";
import { getCustomerData } from '../services/customerService'

export default function Customer() {

  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await getCustomerData();
    setCustomers(res.data.data || []); // default to empty array
  };


  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/customers") // your backend API
  //     .then(res => {
  //       setCustomers(res.data.data); // store customers array
  //     })
  //     .catch(err => {
  //       console.error("Error fetching customers:", err);
  //     });
  // }, []);

  return (
    <div className={styles.carList}>
    <div className={styles.navCol}><Navigation /></div>
    <div className={styles.carClm}>
     <div className={styles.custContainer}>
        <h1 className={styles.customerHeading}>Customers</h1>
      <table className={styles.custTable}>
        <thead className={styles.tableHeading}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Aadhar No</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Total Bookings</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(customers) && customers.map((cust) => (
          // {customers.map((cust) => (
            <tr key={cust._id}>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              <td>{cust.adharNo}</td>
              <td>{cust.phoneNo}</td>
              <td>{cust.address}</td>
              <td>{cust.city}</td>
              <td>{cust.state}</td>
              <td>{cust.country}</td>
              {/* <td>{cust.drivingLicence ? "Yes" : "No"}</td> */}
              <td>{cust.tbooking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
     </div>
    </div>
  </div>
  )
}

