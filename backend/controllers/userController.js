const mongoose = require('mongoose');
const Admin = require('../models/userModel');

const adminLogin = async (req,res,next)=>{
    const { username, password } = req.body;
    try {
       if(username !== "admin"){
        return res.status(401).json({"error ": "Invalid username"});
       }else if (password !== "admin@123") {
        return res.status(401).json({"error ": "Invalid password"});
       } else {
        return res.status(200).json({
            "status" : true, 
            "message" : "Admin logged in successfully!"
       });
    }
    } catch (e) {
        console.log("Error :", e.message);
        res.status(400).json({"error ": e.message});
    }


}

const addUser = async(req,res,next)=>{
    try {
        const addAdmin = new Admin(req.body);
        await addAdmin.save();
        return res.status(201).json({
    "status": true,
    "message": "Users added successfully!",
    addAdmin
});
    } catch (e) {
        console.log("Error :", e.message);
        res.status(400).json({"error ": e.message});
    }

}

module.exports = { adminLogin , addUser};