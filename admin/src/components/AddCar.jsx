import React, { useState } from 'react';
import axios from "axios";
import Navigation from './Navigation';
import styles from './addcar.module.css';
import { useNavigate } from "react-router-dom";
import { createCar } from "../services/CarService";

export default function AddCar() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carModel: "",
    variantName: "",
    engine: "",
    fuel: "",
    transmission: "",
    mileage: "",
    power: "",
    rentPreDay: "",
    configurations: "",
    description: "",
  });
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // 1️⃣ Simple validation: Check all fields are filled
  //   for (const key in formData) {
  //     if (!formData[key]) {
  //       alert(`Please fill ${key} field`);
  //       return;
  //     }
  //   }
  //   if (!img) {
  //     alert("Please upload an image");
  //     return;
  //   }

  //   // 2️⃣ Prepare FormData
  //   const form = new FormData();
  //   form.append("img", img);
  //   Object.keys(formData).forEach((key) => {
  //     form.append(key, formData[key]);
  //   });

  //     try {
  //       await createCar();
  //       alert("Car added successfully!");
  //       console.log(res.data);

  //       // 3️⃣ Send to backend
  //       // const res = await axios.post(
  //       //   "http://localhost:8000/carrentalapi/car/addCar",
  //       //   form,
  //       //   { headers: { "Content-Type": "multipart/form-data" } }
  //       // );  
  
  //       // 4️⃣ Navigate only after success
  //       navigate("/listCars");
  //     } catch (error) {
  //       console.error("Error adding car:", error);
  //       alert("Failed to add car");
  //     }
     
      
    
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    for (const key in formData) {
      if (!formData[key]) {
        alert(`Please fill ${key} field`);
        return;
      }
    }
    if (!img) {
      alert("Please upload an image");
      return;
    }
  
    // Prepare FormData
    const form = new FormData();
    form.append("img", img);
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
  
    try {
      const res = await createCar(form);
      alert("Car added successfully!");
      console.log(res.data);
      navigate("/listCars");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car");
    }
  };
  
   
  
 
  return (
    <div className={styles.carList}>
      <div className={styles.navCol}><Navigation /></div>
      <div className={styles.carClm}>
        <div className={styles.container}>
          <h2 className={styles.heading}> CAR DETAILS </h2>
          <form className={styles.addCarForm} onSubmit={handleSubmit} encType="multipart/form-data">
            
            <input className={styles.carInput} type="text" name="carModel" placeholder="Car Model" onChange={handleChange} required />
            <input className={styles.carInput} type="text" name="variantName" placeholder="Variant Name" onChange={handleChange} required />
            <input className={styles.carInput} type="text" name="engine" placeholder="Engine" onChange={handleChange} required />
            <input className={styles.carInput} type="text" name="fuel" placeholder="Fuel" onChange={handleChange} required />
            <input className={styles.carInput} type="text" name="transmission" placeholder="Transmission" onChange={handleChange} required />
            <input className={styles.carInput} type="text" name="mileage" placeholder="Mileage" onChange={handleChange} required />
            <input className={styles.carInput} type="text" name="power" placeholder="Power" onChange={handleChange} required />
            <input className={styles.carInput} type="number" name="rentPreDay" placeholder="Rent/Day" onChange={handleChange} required />
            
            <div className={styles.descContainer}>
              <div className={styles.fileContainer}>
                <input className={styles.carInput2} type="text" name="configurations" placeholder="Configurations" onChange={handleChange} required />
                <input className={styles.carInput2} type="file" name="img" onChange={handleFileChange} required />
              </div>
              <div className={styles.descriptionContainer}>
                <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
              </div>
            </div>
            
            <button className={styles.addBtn} type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

