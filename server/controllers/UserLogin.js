var userModel = require("../models/UserDB")
var bcrypt = require("bcrypt");

const setLogin = async (req,res) => {

 const user = await userModel.findOne({ email: req.body.emaillogin });
  
  if (user) {
  const isPasswordMatch = await bcrypt.compare(req.body.passlogin, user.password);
  
  if (isPasswordMatch && user.verified === true) {
    req.session.name = user.username;
    req.session.email = user.email;
    req.session.isAdmin = user.isAdmin;
    res.send({user:req.session.name,isAdmin: user.isAdmin})
    
  } else {
    res.send({password:"password",msg:"Wrong Password"})
  }
  } else {
    res.send({email:"email", msg:"Email does not exist"})
  }
  }
module.exports = {setLogin}
  