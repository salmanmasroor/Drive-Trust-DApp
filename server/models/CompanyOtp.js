const mongoose = require("mongoose")

const otpSchema = mongoose.Schema({
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"companies"
    },
    otp:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("companyotp",otpSchema)