const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carModel : {
        type : String,
        required : true,
},
    variantName:  {
        type : String,
        required : true,
},
    engine :  {
        type : String,
        required : true,
},
    fuel:  {
        type : String,
        required : true,
},
transmission:  {
    type : String,
    required : true,
},
    mileage:  {
         type : String,
        required : true,
},
    power:  {
         type : String,
        required : true,
},
    rentPreDay:  {
         type : Number,
        required : true,
},
    configurations:  {
         type : String,
        required : true,
},
    description :  {
         type : String,
        required : true,
},
img : {
    type : [String],
    required : true,
 },
createdAt : {
    type : Date,
    default : ()=> Date.now(),
    immutable :true
},
createdBy : {
    type : Number,
    default : 1 ,
    // type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required: true

},
updatedAt : {
    type : Date,
    default : null
},
updatedBy : {
    type : String,
    // type : mongoose.Schema.Types.ObjectId,
    default : null,
    ref : 'user',
   
},

}
   

);

const carModel = mongoose.model("car", carSchema);

module.exports = carModel;