const mongoose  = require("mongoose");


const userSchema = mongoose.Schema({
    username : {type:String},
    email : {type:String},
    password : {type:String},
    isAdmin : { type: Boolean, default: false },
    profilepic:{type:String, default:null},
    verified:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("users",userSchema);