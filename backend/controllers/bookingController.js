const mongoose = require('mongoose');
const Customer = require('../models/customerModel');
const Car = require('../models/carModel');
const Booking = require('../models/bookingModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bookingModel = require('../models/bookingModel');
dotenv.config();

const addBooking = async(req,res,next)=>{
try {
    const { fromDate, toDate, car_id , fromLocation,toLocation,totalDays} = req.body;

    const carId = await Car.findById(car_id);
    console.log("carId :", carId);
    if (!carId) {
        return res.status(404).json({ "status": false, "message": "Car not found" });
      }

        const rentPerDay = carId.rentPreDay;
        console.log("rentPerDay :", rentPerDay);

        const from = new Date(fromDate);
        const to = new Date(toDate);
        console.log("from :", from);
        console.log("to :", to);

        if (isNaN(from) || isNaN(to)) {
            return res.status(400).json({ status: false, message: "Invalid date format" });
        }

        const caltotalDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) +1 ;
        console.log("caltotalDays :", caltotalDays);

        const caltotalRent = rentPerDay * caltotalDays ;     
        console.log("caltotalRent :", caltotalRent);

        const bookingData = {
       
        cust_id: new mongoose.Types.ObjectId(req.customerId),
        car_id: new mongoose.Types.ObjectId(car_id),
        fromDate, 
        toDate, 
        totalDays : caltotalDays ,
        totalRent : caltotalRent,
        fromLocation,
        toLocation
    };
    console.log("bookingData :", bookingData);
 
     const addbookings = new bookingModel(bookingData);
     await addbookings.save();

     res.status(201).json({
        status: true,
        message: "Booking created successfully",
        booking: addbookings
    });

     
} catch (e) {
    console.log("Error :", e.message);
    res.status(500).json({"error ": e.message});
}
}

// const getBooking = async(req,res,next)=>{
//     try {

//         const getBookings = await bookingModel.find();
//         console.log(getBookings);
//         res.status(200).json(getBookings);
    
//     } catch (e) {
//         console.log("Error :", e.message);
//         res.status(500).json({"error ": e.message});
//     }
// }

// const getBooking = async (req, res, next) => {
//     try {
//       const bookings = await bookingModel.aggregate([
//         // Join with customers
//         {
//           $lookup: {
//             from: "customers", // collection name in MongoDB
//             localField: "cust_id",
//             foreignField: "_id",
//             as: "customer"
//           }
//         },
//         { $unwind: "$customer" },
  
//         // Join with cars
//         {
//           $lookup: {
//             from: "cars", // collection name in MongoDB
//             localField: "car_id",
//             foreignField: "_id",
//             as: "car"
//           }
//         },
//         { $unwind: "$car" },
  
//         // Add bookingNo and selected fields
//         {
//           $addFields: {
//             bookingNo: {
//               $concat: [
//                 "Book",
//                 { $toString: { $add: [1, { $indexOfArray: [[], "$_id"] }] } } // We'll replace this logic below
//               ]
//             },
//             cust_name: "$customer.name",
//             carModel: "$car.carModel"
//           }
//         },
  
//         // Remove customer and car details if not needed
//         {
//           $project: {
//             customer: 0,
//             car: 0
//           }
//         }
//       ]);
  
//       // Generate booking numbers sequentially after aggregation
//       const enrichedBookings = bookings.map((b, i) => ({
//         ...b,
//         bookingNo: `Book${String(i + 1).padStart(3, "0")}`
//       }));
  
//       res.status(200).json(enrichedBookings);
//     } catch (e) {
//       console.error("Error:", e.message);
//       res.status(500).json({ error: e.message });
//     }
//   };
  
const getBooking = async (req, res, next) => {
    try {
      const bookings = await Booking.aggregate([
        // Join with customers
        {
          $lookup: {
            from: "customers",
            let: { custId: { $toObjectId: "$cust_id" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$custId"] } } },
              { $project: { name: 1, address: 1, phoneNo: 1, email: 1 } }
            ],
            as: "customer"
          }
        },
        { $unwind: "$customer" },
  
        // Join with cars
        {
          $lookup: {
            from: "cars",
            let: { carId: { $toObjectId: "$car_id" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$carId"] } } },
              { $project: { carModel: 1, variantName: 1, fuel: 1, Transmission: 1 } }
            ],
            as: "car"
          }
        },
        { $unwind: "$car" },
  
        // Optional: sort by newest booking first
        { $sort: { _id: -1 } }
      ]);
  
      res.status(200).json({
        message: "Bookings fetched successfully",
        status: true,
        data: bookings
      });
    } catch (e) {
      console.log("Error :", e.message);
      res.status(400).json({ error: e.message });
    }
  };

  
// const getBookingById = async(req,res,next)=>{
//     try {
//         const getBookingListById = await bookingModel.findById(req.params.id);
//         res.status(200).json(getBookingListById);
//     } catch (e) {
//         console.log("Error :", e.message);
//         res.status(500).json({"error ": e.message});
//     }
// }

const getBookingById = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    // Convert to ObjectId for matching
    const objectId = new mongoose.Types.ObjectId(bookingId);

    const booking = await Booking.aggregate([
      { $match: { _id: objectId } }, // Filter by booking ID

      // Join with customers
      {
        $lookup: {
          from: "customers",
          let: { custId: { $toObjectId: "$cust_id" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$custId"] } } },
            { $project: { name: 1, address: 1, phoneNo: 1, email: 1 } }
          ],
          as: "customer"
        }
      },
      { $unwind: "$customer" },

      // Join with cars
      {
        $lookup: {
          from: "cars",
          let: { carId: { $toObjectId: "$car_id" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$carId"] } } },
            { $project: { carModel: 1, variantName: 1, engine: 1, mileage: 1,
              fuel: 1,mileage: 1, power: 1, rentPreDay: 1, configurations: 1, description: 1, img: 1  } }

          ],
          as: "car"
        }
      },
      { $unwind: "$car" }
    ]);

    if (!booking || booking.length === 0) {
      return res.status(404).json({ message: "Booking not found", status: false });
    }

    res.status(200).json({
      message: "Booking fetched successfully",
      status: true,
      data: booking[0] // Since it's only one booking
    });
  } catch (e) {
    console.log("Error:", e.message);
    res.status(500).json({ error: e.message });
  }
};

    // const getBookingByCustId = async (req, res, next) => {
    //     try {
    //         // Get customer id from token (middleware `protected` should set this)
    //         const customerId = req.customerId;
    
    //         // Fetch bookings by customer ID and populate car details
    //         const bookings = await Booking.find({ cust_id: customerId })
    //             .populate("car_id") // show car details
    //             .populate("cust_id") // optional: show customer details too
    //             .exec();
    
    //         if (!bookings || bookings.length === 0) {
    //             return res.status(404).json({
    //                 status: false,
    //                 message: "No bookings found for this customer"
    //             });
    //         }
    
    //         res.status(200).json({
    //             status: true,
    //             bookings
    //         });
    
    //     } catch (e) {
    //         console.log("Error :", e.message);
    //         res.status(500).json({ error: e.message });
    //     }
    // };

    const getBookingByCustId = async (req, res, next) => {
      try {
          const customerId = req.customerId;
  
          const bookings = await Booking.find({ cust_id: customerId })
              .populate("car_id")
              .populate("cust_id")
              .exec();
  
          if (!bookings || bookings.length === 0) {
              return res.status(404).json([]);
          }
  
          res.status(200).json(bookings); // ✅ return array only
      } catch (e) {
          console.error("Error :", e.message);
          res.status(500).json({ error: e.message });
      }
  };
  
const updateBookingSts = async(req,res,next)=>{
    try {
        const updateBsts = await Booking.findByIdAndUpdate(req.params.id, 
            {updatedAt : new Date(), 
                bookingApproved : true },
                { new: true });

                if (!updateBsts) {
                    return res.status(404).json({
                        status: false,
                        message: "Booking not found"
                    });
                }     
            res.status(200).json({
            "status": true,
            "message": "Booking approved!",
            "Booking" : updateBsts
        });
    } catch (e) {
        console.log("Error :", e.message);
        res.status(500).json({"error ": e.message});
    }
}

module.exports = { addBooking,getBooking,getBookingById,getBookingByCustId,updateBookingSts }
