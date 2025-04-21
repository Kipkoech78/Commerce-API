const mongoose = require('mongoose')

const AdressSchema = new mongoose.Schema(
    {
        userId: String,
        address: String,
        city:String,
        pinCode: String,
        phone: String,
        notes:String,
    },
    {timestamps:true}
);

module.exports = mongoose.model('Adress', AdressSchema)