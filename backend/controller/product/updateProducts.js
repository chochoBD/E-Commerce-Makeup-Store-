const productsModel = require("../../models/productsModel")
const uploadProductPermission = require("../../helpers/permission")

async function updateProductController(req,res){
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }
        const { _id, ...resBody} = req.body 
        const updateProduct = await productsModel.findByIdAndUpdate(_id,resBody)
        res.json({
            message : "Product update successfully",
            data : updateProduct,
            success : true , 
            erroe : false 
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err ,
            error : true,
            success : false
        })

    }
}

module.exports = updateProductController