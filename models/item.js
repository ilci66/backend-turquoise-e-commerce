const { Schema, model } = require('mongoose');

const Item = Schema({
    name: String,
    img: String,
    categoryId: String,
    // category: String,
    price: Number,
    discount: Number | null,
    inStock: Boolean,
    quantityInStock: Number,
    inSale: Boolean
})

module.epxorts = model('Item', Item);