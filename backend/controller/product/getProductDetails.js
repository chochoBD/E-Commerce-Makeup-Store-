const productModel = require("../../models/productsModel")

const getProductDetails = async(req , res)=> {
    try {    
        const {productId} = req.body
        const product = await productModel.findById(productId);

        res.json({
            data : product ,
            message : "ok" ,
            success : true,
            error : false
        })
       }catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            message: err?.message || 'An error occurred',
            error: true,
            success: false,
        });
    }
    
}
module.exports = getProductDetails