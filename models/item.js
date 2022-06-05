const { Schema, model } = require('mongoose');

const Item = Schema({
    name: String,
    image: String,
    price: Number,
    discount: Number | null,
    quantity: Number,
    inSale: Boolean,
    categoryId: String // category
})

module.epxorts = model('Item', Item);