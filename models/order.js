const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId:String,
    cartItems:[
        {
            productId:String,
            title:String,
            image:String,
            price: String,
            quantity:Number
        }
    ],
    addressInfo: {
        addressId:String,
        address:String,
        city:String,
        pinCode:String,
        phone:String,
        notes:String
    },
    orderStatus: String,
    paymentMethord:String,
    paymentStatus:String,
    totalAmount: Number,
    orderDate:Date,
    orderUpdateDate:Date,
    paymentId:String,
    payerId:String
})

module.exports = mongoose.model('order', OrderSchema)