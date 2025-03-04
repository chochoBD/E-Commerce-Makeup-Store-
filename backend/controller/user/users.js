const userModel = require('../../models/userModel')
async function users(req,res){
    try{
        console.log("all users ", req.userId)
        const  allusers = await userModel.find()
        res.json({
            message : "All Users ",
            data : allusers ,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
      }
}
module.exports = users 