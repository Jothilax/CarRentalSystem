import React from 'react';
import styles from './navigation.module.css';
import { NavLink } from 'react-router-dom';
import jslogo from '../assets/jslogo.png';   // adjust extension (.png/.svg/.jpg)

export default function Navigation() {
  return (
    <div className={styles.nav}>
         <img src={jslogo} alt="Logo" className={styles.logo} />
      <ul className={styles.items}>
        <li className={styles.listitem}>
          <NavLink 
            to="/listCars" 
            className={({ isActive }) => `${styles.itm} ${isActive ? styles.active : ''}`}
          >
            Cars
          </NavLink>
        </li>
        <li className={styles.listitem}>
          <NavLink 
            to="/bookings" 
            className={({ isActive }) => `${styles.itm} ${isActive ? styles.active : ''}`}
          >
            Bookings
          </NavLink>
        </li>
        <li className={styles.listitem}>
          <NavLink 
            to="/customers" 
            className={({ isActive }) => `${styles.itm} ${isActive ? styles.active : ''}`}
          >
            Customer List
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
