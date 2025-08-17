import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import { loginData } from '../services/customerService'

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginData(form);
      localStorage.setItem("token", res.data.token);
      alert("Welcome back! We're glad to see you.")
      navigate("/carList");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1 className={styles.formHeading}>Login</h1>
        <input className={styles.inputfeild} name="email" type="text" placeholder="Email" onChange={handleChange} />
        <input className={styles.inputfeild} name="password" type="password" placeholder="Password" onChange={handleChange} />
        <p className={styles.loginLink} onClick={() => navigate("/signup")}>Not registered? Signup</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
