var userModel = require("../models/UserDB")
var bcrypt = require("bcrypt");
var otpModel = require("../models/otp")
const otpGenerator = require('otp-generator')
var nodemailer = require('nodemailer');
var {body,validationResult} = require("express-validator")

const validation = [
    body('username').notEmpty().withMessage("Name can't be empty")
                .bail()
                .isLength({min:3}).withMessage("Atleast 3 character for Name")
                .bail()
                .isLength({max:32}).withMessage("Maximum 32 character for Name")
                .bail()
                .matches(/^[a-zA-Z]+\s*[a-zA-Z]+$/).withMessage("Name should only contain alphabets")
                ,
    body('email').notEmpty().withMessage("Email can't be null")
                .bail()
                .isEmail().withMessage("Enter the correct Email")
                .bail()
                .custom(value => {
                    // Custom validation for email format
        
                    if (!value.toLowerCase().endsWith('@gmail.com')) {
                        throw new Error('Email must end with @gmail.com');
                    }
                    return true;
                }),
    body('password').notEmpty().withMessage("Password can't be null")
                .bail()
                .isLength({min:8}).withMessage("Password should be minimum 8 character")
]

const setRegistration = async (req,res) => {
    const {username,email,password} = req.body
    const image = req.file ? req.file.filename : null;
    const _email = email.toLowerCase();
    console.log(req.body)
    console.log(req.file)
    console.log(image)
    const error = validationResult(req)
    
    if(!error.isEmpty()){
        res.json({errors:error.array()})
    }
    else if(image !== null ){
        if (!image.endsWith(".jpg") && !image.endsWith(".png") && !image.endsWith(".jpeg")) {
            res.send({ imageError: "Only JPG, JPEG, and PNG files are allowed" });
           
        }
            else{
                const alreadyRegister = await userModel.findOne({email:_email})
                if(alreadyRegister && (alreadyRegister.verified === true)){
                    res.send({msg:"This Email is already registered."})
                }
               
             
                else{
                    const user = await userModel.create({
                        username: username,
                        email: _email,
                        password: await bcrypt.hash(password,10),
                        profilepic: image
                      }
                      )

                      const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false });

                      req.session.userid = (user._id).toString()
                      await otpModel.create({
                          user_id:(user._id).toString(),
                          otp:otp
                        })

                        
                              
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: '', //use your own email
                      pass: '' // and pass key
                    }
                  });
                  
                  var mailOptions = {
                    from: "", //use your own email
                    to: _email,
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
               

        
                          
                      res.send({ok:"ok"})
                }
        }
        }
        else{
            const alreadyRegister = await userModel.findOne({email:_email})
            if(alreadyRegister && (alreadyRegister.verified === true) ){
                res.send({msg:"This Email is already registered."})
            }
            else if (alreadyRegister && !alreadyRegister.verified) {
               const updatedUser = await userModel.findOneAndUpdate(
                    { email: _email }, // Filter: Find the document with this email
                    {                  // Update: Set these fields in the document
                        username: username,
                        email: _email,
                        password: await bcrypt.hash(password,10)
                    },
                    {                  // Options object
                        new: true       // To return the updated document
                    }
                );
          

                const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false, });

              req.session.userid = (updatedUser._id).toString()
              console.log(req.session.userid)
              
              await otpModel.findOneAndUpdate({
                  user_id:updatedUser._id},
                  {
                    otp:otp
                  },{
                    new:true
                  }
                )
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: '', //use your own email
                      pass: '' //and pass key
                    }
                  });
                  
                  var mailOptions = {
                     from: "", //use your own email
                    to: _email,
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
               

                res.send({ok:"ok"})
            }
            else{
            const user = await userModel.create({
                username: username,
                email: _email,
                password: await bcrypt.hash(password,10),
                profilepic: "userprofile1.png"
              }
              )
              const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false, });

              req.session.userid = (user._id).toString()
              
              await otpModel.create({
                  user_id:(user._id).toString(),
                  otp:otp
                })

                              
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: '', //use your own email
                      pass: '' // and pass key
                    }
                  });
                  
                  var mailOptions = {
                     from: "", //use your own email
                    to: _email,
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
               

              res.json({ok:"ok",userreg: "otp"})
        }
    }
    
  }

  module.exports = {setRegistration,validation}