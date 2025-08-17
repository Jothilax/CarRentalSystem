const express = require('express');
const router = express.Router();

const {addCar,getCar,getCarById,updateCar, deleteCar} = require('../controllers/carController');
const upload = require('../middleware/fileupload'); // your multer config

router.post('/addCar', upload.array('img', 5), addCar); 
// 'images' = field name in form-data, max 5 images

// router.post('/addcar', addCar);
router.get('/getCar', getCar);
router.get('/getCarById/:id', getCarById);
// router.put('/updateCar/:id', updateCar);
router.put('/updateCar/:id', upload.array('img', 5), updateCar);
router.delete("/deleteCar/:id", deleteCar);

module.exports = router;