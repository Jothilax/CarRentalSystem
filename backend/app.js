const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connectToDB');
const carRouter = require('./routers/carRouter');
const adminRouter = require('./routers/adminRouter');
const CustomerRouter = require('./routers/customerRouter');
const BookingRouter = require('./routers/bookingRouter');
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


dotenv.config();
const PORT = process.env.PORT || 4000;
console.log("PORT :",PORT);


// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/carrentalapi/car', carRouter);
app.use('/carrentalapi/admin', adminRouter);
app.use('/carrentalapi/customer', CustomerRouter);
app.use('/carrentalapi/booking', BookingRouter);

app.listen(PORT, async()=>{
    console.log(`Server is running at ${PORT}`);
    await connectDB();
});