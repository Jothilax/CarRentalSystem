const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
name : {
     type : String,
    required : true,
    unique : true
},
adharNo : {
     type : Number,
     required : true,
},
email : {
     type : String,
    required : true,
    unique : true
},
phoneNo : {
    type : Number,
    required : true,
   },
password : {
     type : String,
    required : true,
    },
address : {
     type : String,
    required : true,
   },
city : {
     type : String,
    required : true,
   },
state : {
     type : String,
    required : true,
   },
country : {
    type : String,
    required : true,
  },
// drivingLicence : {
//      type : Boolean,
//      required : true
// },
// drivingLicenceFile : {
//      type : String,
//      // required : true,
// }


});

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;