const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter product price"],
        maxLength: [8, "Price can't exceed 8 characters"]
    }
})

module.exports = mongoose.model('Product', productSchema)