const backendDomain = 'http://localhost:5000';

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: 'post',
  },
  signIn: {
    url : `${backendDomain}/api/signin`,
    method: 'post',
  },
  current_user : {
    url : `${backendDomain}/api/user-Details`,
    method : 'get'
  },
  logout_user : {
    url : `${backendDomain}/api/userLogout`,
    method : "get"
  },
    Users :{
    url : `${backendDomain}/api/all-users`,
    method : "get"
  },
  deleteUser: {
    url : `${backendDomain}/api/delete-user/:userId`, // Delete user by ID
    method : "delete"
  }
  ,updateUer:{
    url : `${backendDomain}/api/update-User`,
    method : 'post'
  },uploadProduct:{
    url : `${backendDomain}/api/upload-product`,
    method : 'post'
  },
  allProduct:{
    url : `${backendDomain}/api/get-product`,
    method : 'get'
  },
  updateProduct : {
    url : `${backendDomain}/api/update-product`,
    method : 'post'
  },categoryProduct :{
    url : `${backendDomain}/api/get-CategoryProduct`,
    method : 'get'
  },categoryWiseProduct : {
    url : `${backendDomain}/api/Category-products`,
    method : 'post'
  },
  ProductDetails : {
    url : `${backendDomain}/api/product-Details`,
    method : 'post'
  },
  addToCart : {
    url : `${backendDomain}/api/addtocart`,
    method : 'post'
  },
  addToCartProductCount : {
    url : `${backendDomain}/api/countAddToCartProduct`,
    method : 'get'
  }
  ,
  addToCartProductView : {
    url : `${backendDomain}/api/view-card-product`,
    method : 'get'
  }
, UpdateCartProduct : {
  url : `${backendDomain}/api/update-cart-product`,
    method : 'post'
}, DeleteCartProduct : {
  url : `${backendDomain}/api/delete-cart-product`,
    method : 'post'
}
, SearchProduct: {
  url: `${backendDomain}/api/search`,
  method: 'get'
},filterProduct : {
  url : `${backendDomain}/api/filter-product`,
  method : 'post'
},
SendEmail :{
  url : `${backendDomain}/api/send`,
  method : 'post'
}
};

export default SummaryApi;