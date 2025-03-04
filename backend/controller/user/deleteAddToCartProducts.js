const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProducts = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        const deleteProduct = await addToCartModel.deleteOne({
            _id: addToCartProductId,
            userId: currentUserId  // Ensure only the current user's product is deleted
        });

        if (deleteProduct.deletedCount > 0) {
            res.json({
                message: "Product Deleted From Cart",
                error: false,
                success: true,
            });
        } else {
            res.json({
                message: "Product not found or could not be deleted",
                error: true,
                success: false,
            });
        }
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = deleteAddToCartProducts;
