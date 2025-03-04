
const productsModel = require("../../models/productsModel")
const uploadProductPermission = require("../../helpers/permission")
async function uploadProductsController(req,res){
    try{
        const sessionUserId = req.userId 
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")

        }
        const uploadProduct = new productsModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product upload successfully",
            error : false ,
            success : true ,
            data : saveProduct ,
          })

        

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
          })
    }
}
module.exports = uploadProductsController 