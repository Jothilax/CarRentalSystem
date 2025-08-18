import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import { signupData } from "../services/customerService";

function Signup() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", phoneNo: "",
    adharNo: "", address: "", city: "", state: "", country: ""
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8000/carrentalapi/customer/customerSignup",
  //       form
  //     );
  //     localStorage.setItem("token", res.data.token);
  //     alert("Account created! Thanks for joining us." )
  //     navigate("/carList");
  //   } catch (err) {
  //     alert(err.response.data.message);
  //   }
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await signupData(form);   // ✅ call service
      localStorage.setItem("token", res.data.token);
      alert("Account created! Thanks for joining us.");
      navigate("/carList");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1 className={styles.formHeading}>Signup</h1>
        <input className={styles.inputfeild} name="name" type="text" placeholder="Name" onChange={handleChange} />
        <input className={styles.inputfeild} name="email" type="text" placeholder="Email" onChange={handleChange} />
        <input className={styles.inputfeild} name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input className={styles.inputfeild} name="phoneNo" type="number" placeholder="Phone Number" onChange={handleChange} />
        <input className={styles.inputfeild} name="adharNo" type="number" placeholder="Aadhar Number" onChange={handleChange} />
        <input className={styles.inputfeild} name="address" type="text" placeholder="Address" onChange={handleChange} />
        <input className={styles.inputfeild} name="city" type="text" placeholder="City" onChange={handleChange} />
        <input className={styles.inputfeild} name="state" type="text" placeholder="State" onChange={handleChange} />
        <input className={styles.inputfeild} name="country" type="text" placeholder="Country" onChange={handleChange} />
        <p className={styles.loginLink} onClick={() => navigate("/")}>Already registered? Login</p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
