const { Schema, model } = require('mongoose');

const Cart = Schema({
    item: [ Object ]
})

module.epxorts = model('Cart', Cart);