const { Schema, model } = require('mongoose');

const User = Schema({
    role: String,
    email: String,
    fullName: String,
    hashedPassword: String,
    shippingAddress: {
        country: String,
        city: String,
        buildingNumber : Number,
        street: String,
        floor: Number | String,
        doorNumber: Number | String
    },
    cartId: String | null 
})

module.epxorts = model('User', User);