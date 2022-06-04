const { Schema, model } = require('mongoose');

const Category = Schema({
    name: String,
})

module.epxorts = model('Category', Category);