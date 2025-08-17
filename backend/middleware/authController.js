const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');
const dotenv = require('dotenv');
dotenv.config();

// const protected = async(req,res,next)=>{

//     try {
//         const token = req.header("Authorization")?.replace("Bearer ", "");
//         if(!token){
//             return res.status(401).json({
//                 "Error": "No token , access denined"
//             });
//         }else{
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             // req.cust_id = decoded._id;
//             // console.log("customerId :" , cust_id);

//             req.cust_id = decoded.customerId;
//             console.log("customerId :", req.cust_id);

//            next();
//         }


//     } catch (e) {
//         console.log("Error : ", e.message);
//         res.status(500).json({
//             "Error" : "Authentication unsuccessful!"
//         });
//     }
// }

const protected = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.customerId = decoded.customerId; // ✅ SAME NAME EVERYWHERE
        console.log("Decoded token:", decoded);

        next();

    } catch (err) {
        res.status(401).json({ status: false, message: "Invalid or expired token" });
    }
};
module.exports = { protected }