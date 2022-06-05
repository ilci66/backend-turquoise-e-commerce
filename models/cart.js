const { Schema, model } = require('mongoose');

const Cart = Schema({
    items: [ Object ]
})

module.epxorts = model('Cart', Cart);