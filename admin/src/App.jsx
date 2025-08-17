import styles from './App.module.css'
import AddCar from './components/AddCar'
import Login from './components/Admin'
import { Routes,Route, Link} from 'react-router-dom';
import Booking from './components/Booking';
import Customer from './components/Customer';
import ListCars from './components/ListCars';
import UpdateCarList from './components/UpdateCarList';
import UpdateBookingSts from './components/UpdateBookingSts';

function App() {


  return (
    <div className={styles.App}>
      
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/listCars" element={<ListCars/>} />
      <Route path="/addCar" element={<AddCar/>} />
      <Route path="/updateCar/:id" element={<UpdateCarList/>} />
      <Route path="/bookings" element={<Booking/>} />
      <Route path="/customers" element={<Customer/>} />
      <Route path="/updateBookingSts/:id" element={<UpdateBookingSts/>} />
      </Routes>
    </div>
  )
}

export default App
