const mongoose = require('mongoose');
const Car = require('../models/carModel');

const addCar = async(req,res,next)=>{
try{
    const imagePaths = req.files.map(file => file.path);
    const addCarlist = new Car({...req.body ,
        img : imagePaths  // store images array in DB
    });
    await addCarlist.save();
    console.log(addCarlist)
    
    res.status(200).json({
    "status": true,
    "message": "Car added successfully!",
    addCarlist
});

}catch(e){
console.log("Error :", e.message);
res.status(400).json({"error ": e.message});
}
}

// const getCar = async(req,res,next)=>{
//     try {
//         const getCarList = await Car.find();
//         // console.log(getCarList);
//         res.status(200).json(getCarList);
//     } catch (e) {
//         console.log("Error :", e.message);
//         res.status(400).json({"error ": e.message}); 
//     }

// }
// const getCar = async (req, res, next) => {
//     try {
//         const baseUrl = `${req.protocol}://${req.get('host')}`;

//         const getCarList = await Car.find();

//         const carsWithPublicUrls = getCarList.map(car => {
//             return {
//                 ...car.toObject(),
//                 img: car.img.map(path => `${baseUrl}/${path.replace(/\\/g, '/')}`)
//             };
//         });

//         res.status(200).json(carsWithPublicUrls);

//     } catch (e) {
//         console.error("Error:", e.message);
//         res.status(500).json({ error: e.message });
//     }
// };

// const getCarById = async(req,res,next)=>{
// try {
//     const baseUrl = `${req.protocol}://${req.get('host')}`;

//     const getCarlistById = await Car.findById(req.params.id);

//     const carsWithPublicUrls ={
//         ...Car.toObject(),
//         img : Car.img.map(path => `${baseUrl}/${path.replace(/\\/g, '/')}`)
//     };


//     res.status(200).json(carsWithPublicUrls);
// } catch (e) {
//     console.log("Error :", e.message);
//     res.status(400).json({"error ": e.message}); 
// }
// }

// const getCarById = async (req, res, next) => {
//     try {
//         const baseUrl = `${req.protocol}://${req.get('host')}`;

//         const car = await Car.findById(req.params.id);

//         if (!car) {
//             return res.status(404).json({ message: "Car not found" });
//         }

//         const carWithPublicUrls = {
//             ...car.toObject(),
//             img: car.img.map(path => `${baseUrl}/${path.replace(/\\/g, '/')}`)
//         };

//         res.status(200).json(carWithPublicUrls);
//     } catch (e) {
//         console.log("Error :", e.message);
//         res.status(400).json({ error: e.message });
//     }
// };


// const updateCar = async(req,res,next)=>{
// try {
//     const updatecar = await Car.findByIdAndUpdate(req.params.id, {...req.body,updatedAt : new Date()},{new : true});
//     res.status(200).json({
//         "status": true,
//         "message": "Car update successfully!",
//         updatecar
//     });
// } catch (e) {
//     console.log("Error :", e.message);
//     res.status(400).json({"error ": e.message}); 
// }
// }

// const updateCar = async (req, res, next) => {
//     try {
//       let updateData = {
//         ...req.body,
//         updatedAt: new Date()
//       };
  
//       // Handle new image uploads
//       if (req.files && req.files.length > 0) {
//         // Convert uploaded files into public URLs
//         const baseUrl = `${req.protocol}://${req.get('host')}`;
//         const newImages = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);
        
//         // If you want to REPLACE old images completely
//         // updateData.img = newImages;
  
//         // If you want to ADD to existing images
//         const car = await Car.findById(req.params.id);
//         updateData.img = [...(car.img || []), ...newImages];
//       }
  
//       const updatedCar = await Car.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true }
//       );
  
//       res.status(200).json({
//         status: true,
//         message: "Car updated successfully!",
//         updatedCar
//       });
  
//     } catch (e) {
//       console.error("Error:", e.message);
//       res.status(400).json({ error: e.message });
//     }
//   };


// const updateCar = async (req, res, next) => {
//   try {
//     // Get the existing car
//     const car = await Car.findById(req.params.id);
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     let updateData = {
//       ...req.body,
//       updatedAt: new Date()
//     };

//     // Keep old images
//     let updatedImages = [...(car.img || [])];

//     // Add new images if uploaded
//     if (req.files && req.files.length > 0) {
//       const baseUrl = `${req.protocol}://${req.get('host')}`;
//       const newImages = req.files.map(file =>
//         `${baseUrl}/uploads/${file.filename}`
//       );
//       updatedImages = [...updatedImages, ...newImages];
//     }

//     updateData.img = updatedImages;

//     // Update the car
//     const updatedCar = await Car.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     res.status(200).json({
//       status: true,
//       message: "Car updated successfully!",
//       updatedCar
//     });

//   } catch (e) {
//     console.error("Error:", e.message);
//     res.status(400).json({ error: e.message });
//   }
// };


const getCar = async (req, res, next) => {
  try {
      // Always enforce https:// in production
      const baseUrl = `https://${req.get('host')}`;

      const getCarList = await Car.find();

      const carsWithPublicUrls = getCarList.map(car => {
          return {
              ...car.toObject(),
              img: car.img.map(path => `${baseUrl}/${path.replace(/\\/g, '/')}`)
          };
      });

      res.status(200).json(carsWithPublicUrls);

  } catch (e) {
      console.error("Error:", e.message);
      res.status(500).json({ error: e.message });
  }
};


const getCarById = async (req, res, next) => {
  try {
      // Always enforce https://
      const baseUrl = `https://${req.get('host')}`;

      const car = await Car.findById(req.params.id);

      if (!car) {
          return res.status(404).json({ message: "Car not found" });
      }

      const carWithPublicUrls = {
          ...car.toObject(),
          img: car.img.map(path => `${baseUrl}/${path.replace(/\\/g, '/')}`)
      };

      res.status(200).json(carWithPublicUrls);
  } catch (e) {
      console.log("Error :", e.message);
      res.status(400).json({ error: e.message });
  }
};

const updateCar = async (req, res, next) => {
  try {
    // Get the existing car
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    let updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    // Keep old images
    let updatedImages = [...(car.img || [])];

    // Add new images if uploaded (store relative paths only)
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `uploads/cars/${file.filename}`);
      updatedImages = [...updatedImages, ...newImages];
    }

    updateData.img = updatedImages;

    // Update the car
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Car updated successfully!",
      updatedCar
    });

  } catch (e) {
    console.error("Error:", e.message);
    res.status(400).json({ error: e.message });
  }
};

const deleteCar = async (req, res) => {
    try {
      const carId = req.params.id;
  
      const deletedCar = await Car.findByIdAndDelete(carId);
  
      if (!deletedCar) {
        return res.status(404).json({
          status: false,
          message: "Car not found",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "Car deleted successfully",
        deletedCar,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
module.exports = {addCar,getCar,getCarById,updateCar,deleteCar} ;