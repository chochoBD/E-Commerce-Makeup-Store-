import {createBrowserRouter} from  'react-router-dom'
import App from '../App';
import Home from '../pages/Home'
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel'
import Users from "../pages/Users"
import AllProducts  from "../pages/AllProducts"
import CategoryProducts from "../pages/CategoryProducts"
import DetailsProduct  from "../pages/DetailsProduct"
import Cart from "../pages/Cart"
import SearchProduct from "../pages/SearchProduct"
import AboutUs from "../pages/AboutUs"
import ContactUs from '../pages/ContactUs';

const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            }, {
                path: "/Login",
                element: <Login />,
            } ,
            {
                path: "/forgot-Password",
                element: <ForgotPassword />,
            }
            ,
            
            {
                path: "/sign-up",
                element: <SignUp />,

            }
            ,
            
            {
                path: "/product-category",
                element: <CategoryProducts/>,

            }
            ,
            
            {
                path: "/product/:id",
                element: <DetailsProduct/>,

            }
            ,
            {
                path: "/cart",
                element: <Cart/>,

            } ,
            {
                path: "/search",
                element: <SearchProduct/>,

            },
            {
                path: "/aboutus",
                element: <AboutUs/>,

            }
            ,
            
            {
                path: "/contactus",
                element: <ContactUs/>,

            }
            ,
            { 
                path: "/admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <Users />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                    
            ]
            },
     ]}
])

export default router