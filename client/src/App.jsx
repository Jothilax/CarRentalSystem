import './App.module.css'
import Login from './components/Login'
import Signup from './components/Signup'
import {Routes,Route,Link} from 'react-router-dom'
import ListCars from './components/ListCars'
import AddBooking from './components/AddBooking'
import Bookings from './components/Bookings'
import About from './components/About'
import Profile from './components/Profile'

function App() {
 

  return (
<>
<Routes>
<Route path='/' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/carList' element={<ListCars/>}/>
<Route path='/addbooking/:car_id' element={<AddBooking/>}/>
<Route path='/bookings' element={<Bookings/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/profile' element={<Profile/>}/>

</Routes>
</>
   
  )
}

export default App
