const mongoose  = require("mongoose");

const carSchema = mongoose.Schema({
    carName: { type: String },
    carModel: {type: Number},
    transmission: {type: String},
    fuelEfficiency: {type: String},
    engine:{type: String},
    seatCapacity: {type: String},
    price: {type: String},
    isAvailable: { type: Boolean, default: true },
    carImage:{type:String}

});
/* { _id: false } */

const companySchema = mongoose.Schema({
    companyName : {type:String},
    companyEmail : {type:String},
    password : {type:String},
    publicKey : {type:String,required:true},
    logo:{type:String},
    verified:{
      type: Boolean,
      default: false
  },
    car: [
      carSchema
    ]
})

module.exports = mongoose.model("companies",companySchema);

