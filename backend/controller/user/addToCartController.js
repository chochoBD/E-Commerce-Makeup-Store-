const addToCartModel = require('../../models/cartProduct')

const addToCartController = async(req,res)=>{
    try{
        const { productId } = req?.body 
        const currentUser = req.userId

        const isProductAvaillable = await addToCartModel.findOne({productId})
        console.log("isProductAvaillable", isProductAvaillable)

        if(isProductAvaillable){
            return res.json({
                message : "Already exits in cart" ,  
                success : false ,
                error :  true,
            })
        }

        const payload = {
            productId : productId ,
            quantity : 1 ,
            userId : currentUser ,
        }
        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct , 
            message : "Poduct Added in cart" ,  
            success : true ,
            error : false,
        })
    }catch(err){
        res.json({
            message : err?.message || err , 
            error : true , 
            success : false
        })
    }
}

module.exports = addToCartController