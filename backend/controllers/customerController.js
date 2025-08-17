// const mongoose = require('mongoose');
// const Customer = require('../models/customerModel');
// const Booking = require('../models/bookingModel');
// const bcrypt = require('bcryptjs');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
// dotenv.config();

// const customerSignup = async (req,res,next)=>{

//     try {
//         const {name,email,password, ...rest} = req.body;
//         const emailExits = await Customer.findOne({email});
//         console.log("emailExits :", emailExits);

//         if(emailExits){
//             return res.status(400).json({
//                 "status"  : false,
//                 "message" : "User already exist"
//             });
//         }else{
//             const encryptpwd = await bcrypt.hash(password,10); 
//             console.log("hassedPassword :", encryptpwd);
//             const addCustomer = new Customer({name,email,password : encryptpwd , ...rest});
//             await addCustomer.save();

//             const token = jwt.sign({ cust_id: addCustomer._id }, process.env.JWT_SECRET);
            
//             console.log("addCustomer :", addCustomer);
//             return res.status(201).json({
//                 "status"  : true,
//                 "message" : "Customer added successfully!",
//                 addCustomer,
//                 "token" : token
//             });
//         }
        
//     } catch (e) {
//         console.log("Error :", e.message);
//         res.status(400).json({"error ": e.message});
//     }

// }

// const customerLogin = async(req,res,next)=>{
//     const {email, password} = req.body;
//     console.log(email, password);
// try { 
//     // const {email, password} = req.body;
//     const customer = await Customer.findOne({email});
//     console.log(customer);
//     if(!customer){
//         return res.status(400).json({
//             "error" : "Email is invalid",
//             "status": false

//         });
//     }else{
//     const passwordMatch = await bcrypt.compare(password,customer.password);
//     if (!passwordMatch) {
//         return res.status(400).json({
//             "error" : "Password is invalid",
//             "status": false
//         });
//     } else {
//         const token = jwt.sign(
//             { id: customer._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         // const token = jwt.sign({"customerId" : isEmail._id}, process.env.JWT_SECRET);
//         console.log("token :", token);
//         return res.status(200).json({
//             "message" : "LoggedIn Successfully!",
//             "status" : true,
//             "token" : token,
//             "customer" : customer
//         }); 
//     }
//     }
// } catch (e) {
//     console.log("Error :", e.message);
//     res.status(500).json({"error ": e.message});
// }
// }

// // const getCustomer = async(req,res,next)=>{
// // try {
    
// //     const getCustomerdet = await Customer.find();
// //     console.log("getCustomer :", getCustomer);
// //     return res.status(200).json({
// //         "message": "Customers data fetched successfully!",
// //         "status" : true,
// //         getCustomerdet
// //     });
// // } catch (e) {
// //     console.log("Error :", e.message);
// //     res.status(400).json({"error ": e.message});
// // }
// // }

// const getCustomer = async (req, res) => {
//     try {
//       const results = await Customer.aggregate([
//         {
//           $lookup: {
//             from: "bookings",          // MongoDB collection name for Booking
//             localField: "_id",         // field in Customer
//             foreignField: "cust_id",   // field in Booking
//             as: "bookingData"          // output array
//           }
//         },
//         {
//           $addFields: {
//             tbooking: { $size: "$bookingData" } // count bookings
//           }
//         },
//         {
//           $project: {
//             name: 1,
//             email: 1,
//             phoneNo: 1,
//             address: 1,
//             city: 1,
//             state: 1,
//             country: 1,
//             drivingLicence: 1,
//             adharNo: 1,
//             tbooking: 1
//           }
         
//         },
//         {
//           $sort: { _id: 1 } // same as ORDER BY c._id
//         }
//       ]);
  
//       res.status(200).json({
//         message: "Customers with booking counts fetched successfully!",
//         status: true,
//         data: results
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

  
// // const getCustomer = async (req, res, next) => {
// //     try {
// //       const customers = await Customer.find();
  
// //       const customersWithBookingCount = await Promise.all(
// //         customers.map(async (customer) => {
// //           const totalBookings = await Booking.countDocuments({ customerId: customer._id });
// //           return { ...customer.toObject(), totalBookings };
// //         })
// //       );
  
// //       res.status(200).json({
// //         message: "Customers data fetched successfully!",
// //         status: true,
// //         customers: customersWithBookingCount
// //       });
  
// //     } catch (e) {
// //       console.error("Error:", e.message);
// //       res.status(400).json({ error: e.message });
// //     }
// //   };
  
  
// const getCustomerById = async(req,res,next)=>{
//     try {
        
//         const getCustomerdetById = await Customer.findById(req.params.id);
//         console.log("getCustomerdetById :", getCustomerdetById);
//         return res.status(200).json({
//         "message": "Customer data fetched successfully!",
//         "status" : true,
//         "data" : [getCustomerdetById]
//         });
//     } catch (e) {
//         console.log("Error :", e.message);
//         res.status(400).json({"error ": e.message});
//     }
// }

// const getCustomerByCustId = async(req,res,next)=>{
//     try {
     
//         const customer = await Customer.findById(req.customerId).select("-password"); // exclude password
//         console.log("customer : ",customer);
//         if (!customer) {
//             return res.status(404).json({ 
//                 "status": false,
//                  "message": "Customer not found"
//                  });
//         }
        
//         return res.status(200).json({
//         "message": "Customer data fetched successfully!",
//         "status" : true,
//         "data" : [customer]
//         });
//     } catch (e) {
//         console.log("Error :", e.message);
//         res.status(400).json({"error ": e.message});
//     }
// }

// module.exports = { customerSignup, customerLogin , getCustomer,getCustomerById, getCustomerByCustId };




const mongoose = require('mongoose');
const Customer = require('../models/customerModel');
const Booking = require('../models/bookingModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const customerSignup = async (req,res,next)=>{
    try {
        const {name,email,password, ...rest} = req.body;
        const emailExits = await Customer.findOne({email});
        console.log("emailExits :", emailExits);

        if(emailExits){
            return res.status(400).json({
                status  : false,
                message : "User already exist"
            });
        } else {
            const encryptpwd = await bcrypt.hash(password,10); 
            console.log("hashedPassword :", encryptpwd);

            const addCustomer = new Customer({name,email,password : encryptpwd , ...rest});
            await addCustomer.save();

            // ✅ Always use customerId in token
            const token = jwt.sign(
                { customerId: addCustomer._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            
            console.log("addCustomer :", addCustomer);
            return res.status(201).json({
                status  : true,
                message : "Customer added successfully!",
                customer: addCustomer,
                token   : token
            });
        }
    } catch (e) {
        console.log("Error :", e.message);
        res.status(400).json({error : e.message});
    }
};

const customerLogin = async(req,res,next)=>{
    const {email, password} = req.body;
    console.log(email, password);
    try { 
        const customer = await Customer.findOne({email});
        console.log(customer);

        if(!customer){
            return res.status(400).json({
                error : "Email is invalid",
                status: false
            });
        }

        const passwordMatch = await bcrypt.compare(password,customer.password);
        if (!passwordMatch) {
            return res.status(400).json({
                error : "Password is invalid",
                status: false
            });
        }

        // ✅ Always use customerId in token
        const token = jwt.sign(
            { customerId: customer._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("token :", token);
        return res.status(200).json({
            message : "LoggedIn Successfully!",
            status  : true,
            token   : token,
            customer: customer
        }); 
    } catch (e) {
        console.log("Error :", e.message);
        res.status(500).json({error : e.message});
    }
};

const getCustomer = async (req, res) => {
    try {
      const results = await Customer.aggregate([
        {
          $lookup: {
            from: "bookings",          
            localField: "_id",         
            foreignField: "cust_id",   
            as: "bookingData"          
          }
        },
        {
          $addFields: {
            tbooking: { $size: "$bookingData" } 
          }
        },
        {
          $project: {
            name: 1,
            email: 1,
            phoneNo: 1,
            address: 1,
            city: 1,
            state: 1,
            country: 1,
            drivingLicence: 1,
            adharNo: 1,
            tbooking: 1
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      res.status(200).json({
        message: "Customers with booking counts fetched successfully!",
        status: true,
        data: results
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const getCustomerById = async(req,res,next)=>{
    try {
        const getCustomerdetById = await Customer.findById(req.params.id);
        console.log("getCustomerdetById :", getCustomerdetById);
        return res.status(200).json({
            message: "Customer data fetched successfully!",
            status : true,
            data   : [getCustomerdetById]
        });
    } catch (e) {
        console.log("Error :", e.message);
        res.status(400).json({error : e.message});
    }
};

const getCustomerByCustId = async(req,res,next)=>{
    try {
        // ✅ Now works because middleware sets req.customerId correctly
        const customer = await Customer.findById(req.customerId).select("-password"); 
        console.log("customer : ",customer);
        if (!customer) {
            return res.status(404).json({ 
                status : false,
                message: "Customer not found"
            });
        }
        
        return res.status(200).json({
            message: "Customer data fetched successfully!",
            status : true,
            data   : [customer]
        });
    } catch (e) {
        console.log("Error :", e.message);
        res.status(400).json({error : e.message});
    }
};

module.exports = { customerSignup, customerLogin , getCustomer, getCustomerById, getCustomerByCustId };
