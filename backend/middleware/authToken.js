const jwt = require('jsonwebtoken')
async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token 
       console.log('token', token)
        if(!token){
        return res.status(200).json({
            message : "Please Login...!",
            error : true , 
            success : false
        })
       }
       
        jwt.verify(token, process.env.TOKEN_SECRET_KEY , function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded) 
            if (err) {
                console.log("erroe auth", err)
            }
            req.userId = decoded?._id
          next(); 
        });
        
        
        // Call next to pass control to the next middleware or route handler
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

// Move the export outside the function
module.exports = authToken;
