const express = require('express');
const router = express.Router();
const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignin');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout')
const users = require('../controller/user/users')  
const updateUser = require('../controller/user/updateUser') 
const uploadProductsController = require('../controller/product/uploadProducts')
const getProductController = require("../controller/product/getProduct")
const updateProductController = require('../controller/product/updateProducts')
const getCategoryProduct = require('../controller/product/getCategoryProductsOne')
const  getCategoryWiseproducts = require('../controller/product/getCategoryWiseproducts')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const AddToCartViewProduct = require('../controller/user/AddToCartViewProduct')
const updateAddToCartProducts = require('../controller/user/updateAddToCartPoducts')
const deleteAddToCartProducts = require('../controller/user/deleteAddToCartProducts')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const sendEmailController = require('../controller/user/sendEmailController');
const deleteUser = require('../controller/user/deleteUser');

router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-Details', authToken, userDetailsController);
router.get('/userLogout', userLogout)
router.delete('/delete-user/:userId', authToken, deleteUser); 
router.post('/send', sendEmailController);


//admin panel 
router.get('/all-users', authToken, users)
router.post('/update-User', authToken, updateUser)


//product 
router.post('/upload-product',authToken,uploadProductsController )
router.get('/get-product',getProductController )
router.post("/update-product" ,authToken, updateProductController)
router.get('/get-CategoryProduct', getCategoryProduct)
router.post('/Category-products', getCategoryWiseproducts)
router.post('/product-Details', getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product",filterProductController)
// add to cart 
router.post("/addtocart",authToken, addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken, AddToCartViewProduct )
router.post("/update-cart-product",authToken, updateAddToCartProducts)
router.post("/delete-cart-product",authToken, deleteAddToCartProducts)



module.exports = router;