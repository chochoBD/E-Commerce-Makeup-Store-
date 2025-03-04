const productsModel = require("../../models/productsModel")

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q
        const regex = new RegExp(query,'i','g')
        const products = await productsModel.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category :regex
                }
            ]
        })
        res.json({
            data : products,
            message : "Search product list",
            error : false , 
            success : true 
        })
    }catch(err){
        res.json({
            message : err.message || err , 
            error : true , 
            success : false 
        })
    }
}
module.exports = searchProduct