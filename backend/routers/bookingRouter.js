const express = require('express');
const router = express.Router();

const {  addBooking,getBooking,getBookingById,getBookingByCustId,updateBookingSts } = require('../controllers/bookingController');
const { protected } = require('../middleware/authController');

router.post('/addBooking', protected , addBooking);
// router.get('/getCustBooking', protected , getBooking);
router.get('/getBooking' , getBooking);
router.get('/getBookingById/:id',  getBookingById);
router.get('/getBookingByCustId', protected , getBookingByCustId);
router.put('/updateBookingSts/:id' , updateBookingSts);

module.exports = router;
