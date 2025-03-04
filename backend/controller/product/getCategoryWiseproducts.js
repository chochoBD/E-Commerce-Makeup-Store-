
const productsModel = require('../../models/productsModel')
const getCategoryWiseproducts = async(req , res) => {
try{
    const {category} = req?.body || res?.query
    const product = await productsModel.find({category})

    res.json({
        data : product,
        message : "products found successfully",
        success : true ,
        error : false
    })
}catch(err){
    res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      })
}

}

module.exports =  getCategoryWiseproducts
