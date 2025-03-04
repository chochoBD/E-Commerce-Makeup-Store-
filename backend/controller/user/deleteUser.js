const userModel = require('../../models/userModel');

async function deleteUser(req, res) {
    try {
        const { userId } = req.params; // Get user ID from the URL params
        const user = await userModel.findByIdAndDelete(userId); // Delete the user by ID
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = deleteUser;
