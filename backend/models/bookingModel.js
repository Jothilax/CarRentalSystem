// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({

//     booking_no : {
//         type : String,
//         require:true,
//         unique :true
//     },
//     cust_id :{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'customer',
//         require:true
//     },
//     car_id : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'car',
//         require:true
//     },
//     fromDate : {
//         type : Date,
//         require:true
//     },
//     toDate : {
//         type : Date,
//         require:true
//     },
//     totalDays : {
//         type : Number,
//         // require:true
//     },
//     totalRent :  {
//         type : Number,
//         // require:true
//     },
//     bookingApproved :  {
//         type : Boolean,
//         default : null
//     },
//     location :  {
//         type : String,
//         require:true
//     },
//     createdAt : {
//         type : Date,
//         default : ()=> Date.now()
//     },
//    updatedAt : {
//         type : Date,
//         default : null
//     },
//     updatedBy : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'admin',
//         default : null
//     }

// });

// // const bookingModel = mongoose.model("bookings", bookingSchema);

// // module.exports = { bookingModel };

// module.exports = mongoose.model("Booking", bookingSchema);


// bookingModel.js
const mongoose = require('mongoose');
const Counter = require('./counterModel');

const bookingSchema = new mongoose.Schema({
    booking_no: {
        type: String,
        // required: true,
        unique: true
    },
    cust_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car',
        required: true
    },
    // carModel: { type: String, required: true },
    // variantName: { type: String, required: true },
    // configurations: { type: String, required: true },
    // transmission: { type: String, required: true },
    // mileage: { type: String, required: true },
    // rentPerDay: { type: Date, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    totalDays: { type: Number },
    totalRent: { type: Number },
    bookingApproved: { type: Boolean, default: null },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null }
});

// Auto-generate booking_no safely
bookingSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'booking_no' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true } // Create doc if not exists
            );

            this.booking_no = `Book_${String(counter.seq).padStart(2, '0')}`;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Booking', bookingSchema);

