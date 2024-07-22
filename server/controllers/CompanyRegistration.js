var companyModel = require("../models/CompanyDB")
var bcrypt = require("bcrypt");
var {body,validationResult} = require("express-validator")
const otpGenerator = require('otp-generator')
var nodemailer = require('nodemailer');
var companyotpModel = require("../models/CompanyOtp")
const { Web3 } = require('web3');
const web3 = new Web3("HTTP://127.0.0.1:7545")


const companyValidation = [
    body('companyName').isLength({min:3,max:32}).withMessage("Atleast 3 character for Company Name")
                .bail()
                .matches(/^[a-zA-Z\s]+$/).withMessage("CompanyName only contain alphabets"),
    body('email').notEmpty().withMessage("Email can't be null")
                .bail()
                .isEmail().withMessage("Enter the correct Email")
                .custom(value => {
                  // Custom validation for email format
                  if (!value.toLowerCase().endsWith('@gmail.com')) {
                      throw new Error('Email must end with @gmail.com');
                  }
                  return true;
              }),
    body('password').notEmpty().withMessage("Password can't be null")
                .bail()
                .isLength({min:8}).withMessage("Password should be minimum 8 character"),
    body('publicKey').notEmpty().withMessage("Public Key can't be Empty")
                    .bail()
                    .isLength({min:40}).withMessage("public key  40 character ")
  ]
const setCompanyRegistration = async(req,res)=>{
    var {companyName,email,password,publicKey} = req.body
    var email = email.toLowerCase()
      const useraccounts = await web3.eth.getAccounts()
      console.log(useraccounts)
      var publickeyerror = null;
      for(var i=0;i<useraccounts.length;i++){
        if(useraccounts[i] === publicKey ){
          publickeyerror = "found";
        }
      }
      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      res.json({error:errors.array()})
    }
    else{
      const same = await companyModel.findOne({companyEmail:email})
      const alreadyregPublickey = await companyModel.findOne({publicKey:publicKey})
      const alreadycompanyName = await companyModel.findOne({companyName:companyName})
      console.log(alreadycompanyName+"sadad")
      if(same){
      res.send({msg1:"Email Already Registered"})
      }
      else if(alreadycompanyName){
        res.send({company_error:"Company Name already registered"})
      }
      else if(publickeyerror === null){
      res.send({wrong_publickey:"wrong public key"})
    }
      else if(alreadyregPublickey){
      res.send({wrong_publickey:"public key already registered"})
      }
      else if (!req.file) {
        res.send({ pic: 'Please upload your logo' });
      }
        
      else{
        if (!req.file.filename.endsWith(".jpg") && !req.file.filename.endsWith(".png") && !req.file.filename.endsWith(".jpeg")) {
          res.send({ pic: "Only JPG, JPEG, and PNG files are allowed" });
      }
      
      else{
        const company =await companyModel.create({
          companyName: companyName,
          companyEmail : email,
          password : await bcrypt.hash(password,10),
          publicKey : publicKey,
          logo : req.file.filename
        })

        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false, });

        req.session.companyid = (company._id).toString()
        
        await companyotpModel.create({
            company_id:(company._id).toString(),
            otp:otp
          })

                        
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'salman1817m@gmail.com',
                pass: 'debw jhqb jptb ezka'
              }
            });
            
            var mailOptions = {
               from: "salman1817m@gmail.com",
              to: email,
              subject: 'Otp for Verification',
              text: otp
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
         

        res.send({ok:"ok",companyreg: "otp"})
    }
  }
  }
    }
    module.exports = {setCompanyRegistration,companyValidation}