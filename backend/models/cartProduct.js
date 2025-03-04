const mongoose = require('mongoose')

const addToCart = mongoose.Schema(
    {
    productId : {
        ref : 'Product',
        type: mongoose.Schema.Types.ObjectId,
    },
    quantity : Number,
    userId : String,
    
},{
    timestamps : true 
})

const addToCartModel = mongoose.model("addToCart",addToCart)
module.exports = addToCartModel