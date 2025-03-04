const productsModel = require("../../models/productsModel");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productsModel.distinct('category');
    console.log("category", productCategory);

    // array to store one product from each category
    const products = [];

    for (const category of productCategory) {
      const product = await productsModel.findOne({ category });

      if (product) {
        products.push(product);
      }
    }

    res.json({
      message: "category product",
      data: products, // returning products array instead of categories
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProduct;
