import React from 'react'
import Navigation from './Navigation'
import styles from './about.module.css'
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <>
    

    <div className={styles.carList}>
      {/* Sidebar */}
      <div className={styles.navCol}>
        <Navigation />
      </div>

      {/* Main Content */}
      <div className={styles.carClm}>
        <section className={styles.hero}>
          <h1>Self-Drive Car Rental in South India</h1>
          <p>
            Explore the freedom of travel with <b>JS Car Rental</b>, South India’s trusted self-drive car rental service. 
            Offering affordable, flexible car rentals across Kerala, Tamil Nadu, Karnataka, Hyderabad, and beyond, 
            JS Car Rental lets you choose from a wide range of vehicles tailored to fit your needs and budget.
          </p>
        </section>

        <section>
          <h2>Our Story</h2>
          <p>
            Founded with a vision to redefine car rental convenience, JS Car Rental has been serving customers with reliable, 
            high-quality service since inception. Our journey began with the goal of making car rentals easier and more accessible 
            for travelers and locals alike.
          </p>
        </section>

        <section>
          <h2>Why Choose JS Car Rental?</h2>
          <ul>
            <li><b>Affordable Rates & Lowest Security Deposit</b> – Transparent pricing with lowest deposits.</li>
            <li><b>Doorstep Delivery</b> – Get cars delivered to your location or airport.</li>
            <li><b>Wide Range of Vehicles</b> – From economy to premium cars.</li>
            <li><b>Flexible Rental Periods</b> – Daily, weekly, or monthly rentals.</li>
            <li><b>24/7 Support</b> – Assistance anytime during your journey.</li>
            <li><b>Easy Booking Process</b> – Quick booking on our website or app.</li>
          </ul>
        </section>

        <section>
          <h2>Our Self-Drive Car Rental Services</h2>
          <p>
            JS Car Rental provides reliable rentals across South India — from airport pickups to long road trips, 
            with doorstep delivery options.
          </p>
        </section>

        <section>
          <h2>Our Process</h2>
          <ol>
            <li><b>Booking and Selection</b> – Choose your vehicle and duration.</li>
            <li><b>Vehicle Delivery</b> – At your location or pickup spots.</li>
            <li><b>On the Road Support</b> – 24/7 assistance during rental.</li>
            <li><b>Return and Review</b> – Smooth return options.</li>
          </ol>
        </section>

        <section className={styles.contact}>
          <h2>Connect with JS Car Rental Today</h2>
          <p>
            Experience the convenience of self-drive car rentals with JS Car Rental, trusted by thousands across South India. 
            Whether budget-friendly or premium, we make every journey memorable. 
          </p>
          <button className={styles.ctaBtn} onClick={() => navigate('/carList')}>Book Now</button>
        </section>
      </div>

          

    </div>

    <footer className={styles.footer}>
  <div className={styles.footerContent}>
    <div>
      <h3>Get in touch</h3>
      <p>
        3, 1047/2, Indus Motor Company Pvt LTD <br />
        M.G. Road, Thevara, Ernakulam, Kerala, 682015
      </p>
    </div>
    <div>
      <p>Email: <a href="mailto:support@jscarrental.in">support@indusgo.in</a></p>
      <p>Phone: <a href="tel:+919539580000">+91 9539580000</a></p>
    </div>
  </div>
  <div className={styles.footerBottom}>
    © 2025 <b>JS Car Rental</b>. All rights reserved.
  </div>
</footer>


    </>
  )
}
