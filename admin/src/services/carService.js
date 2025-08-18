// import axios from "axios";

// // Base API URL
// const API_URL = "http://localhost:8000/carrentalapi/car";

// // GET all cars
// export const getCars = () => axios.get(`${API_URL}/getCar`);

// // CREATE new car
// export const createCar = (form) =>  axios.post(
//   `${API_URL}/addCar`,
//   form,
//   { headers: { "Content-Type": "multipart/form-data" } }
// );

// // axios.post(`${API_URL}/addCar`, carData, {
// //   headers: { "Content-Type": "application/json" }
// // });

// // DELETE car by ID
// export const deleteCar = (id) => axios.delete(`${API_URL}/deleteCar/${id}`);

// // GET single car by ID
// export const getCarById = (id) => axios.get(`${API_URL}/getCar/${id}`);

// // UPDATE car by ID
// export const updateCar = (id, formData) => axios.put(
//   `http://localhost:8000/carrentalapi/car/updateCar/${id}`,
//   formData,
//   {
//     headers: { "Content-Type": "multipart/form-data" },
//   }
// );

// // axios.put(`${API_URL}/updateCar/${id}`, carData, {
// //   headers: { "Content-Type": "application/json" }
// // });




import axios from "axios";

// Base API URL
const API_URL = "https://carrentalsystembackend-w0jf.onrender.com/carrentalapi/car";

// GET all cars
export const getCars = () => axios.get(`${API_URL}/getCar`);

// CREATE new car
export const createCar = (form) =>
  axios.post(`${API_URL}/addCar`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  });

// DELETE car by ID
export const deleteCar = (id) => axios.delete(`${API_URL}/deleteCar/${id}`);

// GET single car by ID
export const getCarById = (id) => axios.get(`${API_URL}/getCarById/${id}`);

// UPDATE car by ID
export const updateCar = (id, formData) =>
  axios.put(`${API_URL}/updateCar/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
