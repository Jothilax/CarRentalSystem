import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import styles from './updateCar.module.css';
import { getCarById, updateCar } from "../services/CarService";

export default function UpdateCarList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
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
    img: []
  });
  const [files, setFiles] = useState([]);

  // Fetch existing car details
  useEffect(() => {
    getCarById(id)
      .then((res) => {
        const data = res.data;
        setCarData({
          carModel: data.carModel || "",
          variantName: data.variantName || "",
          engine: data.engine || "",
          fuel: data.fuel || "",
          transmission: data.transmission || "",
          mileage: data.mileage || "",
          power: data.power || "",
          rentPreDay: data.rentPreDay || "",
          configurations: data.configurations || "",
          description: data.description || "",
          img: Array.isArray(data.img) ? data.img : []
        });
      })
      .catch((err) => console.error("Error fetching car:", err));
  }, [id]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(carData).forEach(([key, value]) => {
      if (key !== "img") formData.append(key, value);
    });

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("img", file);
      });
    }

    try {
      await updateCar(id, formData);
      alert("Car updated successfully!");
      navigate("/listCars");
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating car");
    }
  };

  return (
    <div className={styles.carList}>
      <div className={styles.navCol}><Navigation /></div>
      <div className={styles.carClm}>
       
          <h2 className={styles.heading}> CAR DETAILS </h2>
          <div className={styles.updateCarDet}>
          <form className={styles.addCarForm} onSubmit={handleSubmit} encType="multipart/form-data">

<div className={styles.row1}>

<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Car Model</label>
<input className={styles.carInput} type="text" name="carModel" value={carData.carModel} onChange={handleChange} required />
</div>
<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Variant Name</label>
<input className={styles.carInput} type="text" name="variantName" value={carData.variantName} onChange={handleChange} required />
</div>
<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Engine</label>
<input className={styles.carInput} type="text" name="engine" value={carData.engine} onChange={handleChange} required />
</div>
<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Fuel</label>
<input className={styles.carInput} type="text" name="fuel" value={carData.fuel} onChange={handleChange} required />
</div>

</div>
<div className={styles.row1}>
<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Transmission</label>
<input className={styles.carInput} type="text" name="transmission" value={carData.transmission} onChange={handleChange} required />
</div>
<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Mileage</label>
<input className={styles.carInput} type="text" name="mileage" value={carData.mileage} onChange={handleChange} required />
</div>
<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Power</label>
<input className={styles.carInput} type="text" name="power" value={carData.power} onChange={handleChange} required />
</div>
<div className={styles.carFormdata}>
<label className={styles.carFormkey}>Rent Pre Day</label>
<input className={styles.carInput} type="number" name="rentPreDay" value={carData.rentPreDay} onChange={handleChange} required />
</div>
</div>


<div className={styles.descContainer}>
  <div className={styles.fileContainer}>

<div className={styles.carFormdataf}>
<label className={styles.carFormkey}>Configurations</label>
<input className={styles.carInputf} type="text" name="configurations" value={carData.configurations} onChange={handleChange} required />
</div>

<div className={styles.carFormdataf}>
<input className={styles.carInput} type="file" name="img" onChange={handleFileChange} />
</div>
  </div>

  <div className={styles.descriptionContainer}>
  <div className={styles.carFormdatad}>
    <label className={styles.carFormkey}>Description</label>
    <textarea  name="description" value={carData.description} onChange={handleChange} required></textarea>
  </div>
  </div>
 
</div>
<div className={styles.imagesCont}>

<div className={styles.carImage}>
      {carData.img && carData.img.length > 0 &&
        carData.img.map((url, index) => (
          <img className={styles.carimg} key={index} src={url} alt={`${carData.carModel} ${index + 1}`} />
        ))
      }
    </div>
    <div className={styles.uptBtn} >
    <button className={styles.addBtn} type="submit">Update</button>
    </div>

</div>

</form>
          </div>
         
        </div>
     
    </div>
  );
}
