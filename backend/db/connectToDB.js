const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB =  async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected")
    }catch(e){
        console.log("Error :", e.message);
        process.exit(1);
    }
   
}

module.exports = connectDB;
