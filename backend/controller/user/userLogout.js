async function userLogout(req,res) {
    try{
        res.clearCookie("token")
        res.json({
            message: "Logged out successfully",
            data: [],
            success: true,
            error: false
        })

    }catch (err) {
        res.status(400).json({
          message: err.message, // Use err.message for better error clarity
          error: true,
          success: false,
        })
    
}}
module.exports = userLogout