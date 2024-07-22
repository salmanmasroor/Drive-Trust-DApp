const mongoose  = require("mongoose");

const rewardSchema = mongoose.Schema({
    companyName : { type: String},
    publicKey : { type: String},
    date: { type: Date, default: Date.now },
    payment: { type: String, default: null }
})

module.exports = mongoose.model("reward",rewardSchema);