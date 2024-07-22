var companyModel = require("../models/CompanyDB")
var bcrypt = require("bcrypt");

const setCompanyLogin = async (req,res)=>{

    const company = await companyModel.findOne({companyEmail:req.body.loginemail})
    if (company) {
      const isPasswordMatch = await bcrypt.compare(req.body.loginpassword, company.password);
      if (isPasswordMatch && company.verified === true) {
        req.session.companyName = company.companyName;
        req.session.publicKey = company.publicKey;

        res.send({username: req.session.companyName,
                  publicKey: req.session.publicKey})
                 
                  
       
      } else {
        res.send({password:"password",msg:"Wrong Password"})
      }
    } else {
        res.send({email:"email", msg:"Email does not exist"})
    }
  }
  
  module.exports = {setCompanyLogin}