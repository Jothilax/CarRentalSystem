import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './admin.module.css';

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/carrentalapi/admin/adminlogin", form);
    //   localStorage.setItem("token", res.data.token);
            alert("Admin Login successful!");
            navigate("/listCars");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className={styles.loginpg}>
      <form className = {styles.formContainer} onSubmit={handleSubmit}>
        <div className = {styles.formElements}>
        <input className={styles.inputfield} name="username" type="text" onChange={handleChange} placeholder="Username" /><br/>
      <input className={styles.inputfield} name="password" type="password" onChange={handleChange} placeholder="Password" /><br/>
      <button className={styles.logbtn} type="submit">Login</button>
        </div>
      </form>
    </div>
   
  );
}

export default Login;
