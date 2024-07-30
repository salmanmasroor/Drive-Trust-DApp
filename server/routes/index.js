var express = require('express');
var router = express.Router();
var companyModel = require("../models/CompanyDB")
var userModel = require("../models/UserDB")
var rewardModel = require("../models/Reward")
var otpModel = require("../models/otp")
const multer  = require('multer')
const mongoose  = require("mongoose");
var nodemailer = require('nodemailer');
var companyotpModel = require("../models/CompanyOtp")



async function connect(){

  await mongoose.connect("mongodb://localhost:27017/carrentalproject")
}

connect()

var {setRegistration,validation} = require("../controllers/UserRegistration")
var {setLogin} = require("../controllers/UserLogin")
var {setCompanyRegistration,companyValidation} = require("../controllers/CompanyRegistration")
var {setCompanyLogin} = require("../controllers/CompanyLogin")
var {setCompanyCarUpload,carValidation} = require("../controllers/CompanyCarUpload")
var {setBook} = require("../controllers/Book")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
      return cb(null,`${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.post("/registration",upload.single('file'),validation,setRegistration)
router.post("/userlogin",setLogin);

router.post("/companyregistration",upload.single('logo'),companyValidation,setCompanyRegistration)
router.post("/login",setCompanyLogin)
router.post("/uploadcar",upload.single('carpic'),carValidation,setCompanyCarUpload)
router.post("/book",upload.single("cnic"),setBook)




router.get("/user", async(req,res)=>{
  try{
  var data = await userModel.find({
    email : req.session.email
  })

    res.json(data)
  
  console.log(data)
}catch(e){
  console.log(e)
}
})
router.get("/company", async(req,res)=>{
  try{
  var data = await companyModel.find({
    publicKey : req.session.publicKey
  })
  res.json(data)
  console.log(data)
}catch(e){
  console.log(e)
}
})

router.get("/companyinfo", async(req,res)=>{
  try{
  var data = await companyModel.find({
    email : req.session.email
  })
  res.json(data)
}catch(e){
  console.log(e)
}
})

router.get("/companies",async(req,res)=>{
    const companyData = await companyModel.find();
    console.log(req.session.name)
    console.log(companyData)
    res.json(companyData)
})

router.get("/search/:searchname",async(req,res)=>{
  console.log(req.params.searchname+"sadas")
  try{
    var data = await companyModel.find({
      companyName: { $regex: new RegExp('^' + req.params.searchname, 'i') }
    }).lean();

  console.log(data)

  if(!(data.length === 0)){
    res.json(data)
  }
  else{
    res.json({error:"error"})
  }
}catch(e){
  console.log(e)
}
})

router.get("/companies/:id", async(req,res)=>{
  console.log(req.params.id+"sadas")
  try{
  var data = await companyModel.find({
    companyName: req.params.id
  }).lean();

  console.log(data)

  if(!(data.length === 0)){
    res.json(data)
  }
  else{
    res.json({error:"error"})
  }
}catch(e){
  console.log(e)
}
}
)

router.get("/companies/:id/:carid",async (req,res)=>{
  try{
  var data = await companyModel.findOne(
    {
      companyName: req.params.id,
      car: {
        $elemMatch: { _id : req.params.carid }
      }
    },
    {
      'publicKey': 1,
      'car.$': 1
    }
  ).lean();

  res.json(data)
 
  }catch(e){
    console.log("error")
    res.send({error:"error"})
  }
})


router.get("/manage",async (req,res)=>{
  
  console.log(req.session.companyName)
  try{
    var data = await companyModel.find({
      publicKey: req.session.publicKey
    }).lean();
    console.log(data)
    if(!(data.length === 0)){
      res.json(data)
    }
    else{
      res.json({error:"error"})
    }
  }catch(e){
    res.send({error:"error"})
  }
})

router.get("/manage/:carid/delete",async (req,res)=>{

  console.log(req.params.carid)
  try {
    const result = await companyModel.updateOne(
        { companyName: req.session.companyName },
        { $pull: { car: { _id: req.params.carid } } }
    );
    console.log(result);
} catch (error) {
    console.error(error);
}
})

router.get("/rented/:carid", async (req, res) => {
  try {
    const filter = {
      companyName: req.session.companyName,
      'car._id': req.params.carid
    };
    const update = {
      $set: { 'car.$.isAvailable': false }
    };
    
    const result = await companyModel.updateOne(filter, update);
    
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get('/logout', (req, res) => {
  // Destroy session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.clearCookie("connect.sid")
      res.send({logout:"logout"}); // Redirect to login page or any other desired page
    }
  });
});

router.get('/achievements', async (req, res) => {
  try {
    const numberOfUsers = await userModel.countDocuments();
    const numberOfCompanies = await companyModel.countDocuments();
    const documentsOfPayment = await rewardModel.find({}, 'payment');
    let totalPayment = 0;
    documentsOfPayment.forEach(doc => {
        totalPayment += parseFloat(doc.payment);
    });

console.log(totalPayment); 
console.log(req.session.name)
    res.send({ numberOfUsers,numberOfCompanies,totalPayment }); // Sending the number of users as a response
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/userdata',async (req,res)=>{
  const users = await userModel.find();
  console.log(users)
  res.json(users)
})
router.get('/companydata',async (req,res)=>{
  const company = await companyModel.find();
  console.log(company)
  res.json(company)
})

router.post('/record',async (req,res)=>{
  const {companyName,publicKey,payment,useremail} = req.body
  await rewardModel.create({
    companyName: companyName,
    publicKey : publicKey,
    payment : payment
  })
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'salman1811m@gmail.com',
      pass: 'rtvp obsh raiu uopr'
    }
  });
  
  var mailOptions = {
    from: "salman1811m@gmail.com",
    to: useremail,
    subject: 'DriveTrust',
    text: 'Your request for car rental has been accepted.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 
})

router.get('/paymentdata',async (req,res)=>{
  const reward = await rewardModel.find();
  console.log(reward)
  res.json(reward)
})

router.post('/isAvailable/:name/:carid', async (req, res) => {
  try {
    const { isAvailable } = req.body;
    console.log(isAvailable + "server");
    
    const result = await companyModel.updateOne(
      { companyName: req.params.name, "car._id": req.params.carid },
      { $set: { "car.$.isAvailable": true } }
    );
    console.log(result);
    
    res.json({result:result}); // Assuming you want to send the result back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Send an error response if something goes wrong
  }
});


router.post("/otp",async (req,res)=>{
  const {one,two,three,four} = req.body
  const value1 = one+two+three+four
  let verifyotp = await otpModel.findOne({user_id:req.session.userid})
  if(Number(value1)  == Number(verifyotp.otp)){
    await userModel.findOneAndUpdate({_id:req.session.userid},{verified:true},{new:true})
    res.send({ok:"ok"})
  }
})

router.post("/companyotp",async (req,res)=>{
  const {one,two,three,four} = req.body
  const value1 = one+two+three+four
  console.log(value1)
  
  let verifyotp = await companyotpModel.findOne({company_id:req.session.companyid})
  console.log(verifyotp)
  if(Number(value1)  == Number(verifyotp.otp)){
    await companyModel.findOneAndUpdate({_id:req.session.companyid},{verified:true},{new:true})
    
    res.send({ok:"ok"})
  }
    
})



module.exports = router;
