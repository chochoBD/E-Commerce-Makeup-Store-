
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common/index.js';
import Context from './context';
import {useDispatch} from "react-redux";
import { setUserDetails } from './store/userSlice.js';



function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount]= useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    })
    const dataApi = await dataResponse.json();
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

  }

  const fetchUserAddToCart = async() => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    })
    const dataApi = await dataResponse.json();
   
   setCartProductCount(dataApi?.data?.count)

  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart()

  }, [])


  return (
    <>

     <Context.Provider value={
        {
          fetchUserDetails , //user deatil fetch
          cartProductCount , //current user add to cart product count
          fetchUserAddToCart
        }
      }>
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      closeOnClick
      pauseOnHover
      draggable
      icon={false}              // No default icons for a minimalist look
      style={{
        fontSize: "0.9rem",
        borderRadius: "12px",
        padding: "12px 16px",
        backdropFilter: "blur(10px)", // Glass effect
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent background
        color: "#ffffff",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
/>

        <Header />
        <main className='min-h-[calc(98vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>

  );
}

export default App;
