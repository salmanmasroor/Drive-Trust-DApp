var companyModel = require("../models/CompanyDB")
var {body,validationResult} = require("express-validator")


const carValidation = [
    body('carName').notEmpty().withMessage("Can't not be Empty")
    .bail()
    .isLength({min:3}).withMessage("minimum 3 character")
    .bail()
    .matches(/^[a-zA-Z\s]+$/).withMessage("Car Name only contain alphabets"),
    body('carModel').notEmpty().withMessage("Select the Car Model")
    .bail()
    .isInt().withMessage("Must be Integer")
    .bail()
    .isInt({min:2000,max:2024}).withMessage("Must be between 2000 - 2024"),
    body('transmission')
    .notEmpty().withMessage("Select the Transmission")
    .bail()
    .isString().withMessage("Must be a String")
    .bail()
    .isIn(["Manual", "Automatic"]).withMessage("Must be one of 'Manual' or 'Automatic'"),
    body('fuelEfficiency').notEmpty().withMessage("Can't not be empty")
    .bail()
    .isInt().withMessage("Must be Integer"),
    body('seats').notEmpty().withMessage("Select the Seat Capacity")
    .bail()
    .isInt().withMessage("Must be Integer")
    .bail()
    .isInt({min:4,max:5}).withMessage("Must be between 4 - 5"),
    body('engine')
    .notEmpty().withMessage("Select the Engine")
    .bail()
    .isString().withMessage("Must be a String")
    .bail()
    .isIn(["Petrol", "Diseal"]).withMessage("Must be one of 'Petrol' or 'Diseal'"),
    body('price')
    .notEmpty().withMessage("Enter the Price")
    .bail()
    .isInt({min:1,max:100}).withMessage("Must be between 1 - 100 Ether")
]
const setCompanyCarUpload = async(req,res)=>{
    const error  = validationResult(req)
    if(!error.isEmpty()){
        console.log(error.array())
        console.log(req.body.transmission)
        console.log(req.body.seats)
        console.log(req.body.engine)
        res.json({error: error.array()})
    }
    else{
         if (!req.file) {
            res.send({ carpic: 'Please upload your car pic' });
          }
          else if (!req.file.filename.endsWith(".jpg") && !req.file.filename.endsWith(".png") && !req.file.filename.endsWith(".jpeg")) {
            res.send({ carpic: "Only JPG, JPEG, and PNG files are allowed" });
        }
    else{
        console.log(req.session.companyName)
        console.log(req.body.carModel)
        console.log(req.body.carName)
    await companyModel.updateOne(
      { companyName:req.session.companyName},
      { $push: {car: { 
        carName: req.body.carName,
        carModel: req.body.carModel,
        transmission: req.body.transmission,
        fuelEfficiency: req.body.fuelEfficiency,
        engine: req.body.engine,
        seatCapacity: req.body.seats,
        price: req.body.price,
        carImage: req.file.filename,          
        
        }} }
    );
    console.log("store")
    res.json({save: "ok"})
    }
}
}

  module.exports = {setCompanyCarUpload,carValidation}