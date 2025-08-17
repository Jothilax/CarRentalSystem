const express = require('express');
const router = express.Router();
const { adminLogin , addUser} = require('../controllers/userController');

router.post('/adminlogin', adminLogin);
router.post('/addUser', addUser);


module.exports = router;