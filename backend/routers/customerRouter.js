const express = require('express');
const router = express.Router();

const { customerSignup,customerLogin , getCustomer,getCustomerById , getCustomerByCustId} = require('../controllers/customerController');
const { protected } = require('../middleware/authController');

router.post('/customerSignup', customerSignup);
router.post('/customerLogin', customerLogin);
router.get('/getCustomer', getCustomer);
router.get('/getCustomerById/:id', getCustomerById);
router.get('/getCustomerByCustId', protected , getCustomerByCustId);

module.exports = router;