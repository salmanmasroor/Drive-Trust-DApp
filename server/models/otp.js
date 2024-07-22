const mongoose = require("mongoose")

const otpSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    otp:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("otp",otpSchema)