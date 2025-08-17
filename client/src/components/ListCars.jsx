import React from 'react'
import Navigation from './Navigation'
import styles from './listcars.module.css'
import { useEffect, useState } from "react";
import { getCars } from "../services/CarService";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus , faPenToSquare , faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ListCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await getCars();
    setCars(res.data);
  };


  
  return (
    <div className={styles.carList}>
      <div className={styles.navCol}><Navigation/></div>
      <div className={styles.carClm}>
      {/* <div className={styles.addCarBtn} >
        <button className={styles.carBtn} onClick={() => navigate("/addCar")}> <FontAwesomeIcon icon={faPlus} /> Add Car</button>
      </div> */}
       {/* <h2>Available Cars</h2> */}
      <div className={styles.container}>
       
      {cars.map((car) => (
        <div key={car._id} className={styles.card}>
          <img
            src={car.img[0] }
            alt={car.carModel}
            className={styles.image}
          />
          <div className={styles.details}>
            <h3 className={styles.modelDetails}>{car.carModel}</h3>
            <p className={styles.configDetails}>{car.variantName} | {car.engine} | {car.fuel} | {car.mileage} | {car.power}</p>
            <p className={styles.rsDetails}><strong>Rent/Day:</strong> ₹{car.rentPreDay}</p>
            {/* <p style={styles.description}>{car.description}</p> */}
          </div>
          {/* //.... */}
          <div className={styles.updateIcon}>
           <button className={styles.bookingBtn} onClick={() => navigate(`/addbooking/${car._id}`)}>Book Now</button>
          {/* <FontAwesomeIcon icon={faPenToSquare} className={styles.updateCarIcon} onClick={() => navigate(`/updateCar/${car._id}`)} />
          <FontAwesomeIcon icon={faTrash} className={styles.updateCarIcon} onClick={() => handleDelete(car._id)} /> */}
          </div>

          {/* //... */}
        </div>
      ))}
    </div>

</div>

</div>

  )
}
