const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
    productName : String ,
    brandName : String,
    category : String,
    productImages : [],
    description : String,
    price : Number,
    selling : Number,
},{
    timestamps : true 
})

const productsModel = mongoose.model("Product", ProductSchema)
module.exports = productsModel