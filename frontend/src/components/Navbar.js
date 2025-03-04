import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayMadCurrency from "../helpers/displayCurrency";
import { LiaShoppingCartSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Context from '../context';
import { SlHandbag } from "react-icons/sl";

const Navbar = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const user = useSelector((state) => state?.user?.user);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData(responseData.data);
            } else {
                console.error("Failed to fetch data:", responseData.message);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = data.reduce((sum, item) => sum + item.productId?.selling * item.quantity, 0);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex justify-between items-center bg-[#eb3986] p-6  mx-auto h-full px-4 lg:px-8 transition-all duration-100 ease-in-out transform hover:scale-10">
            <div className="flex space-x-8 text-white">
                <Link to="/aboutus">
                    <div className="cursor-pointer group relative">
                        <div className="group-hover:transition duration-300 ease-in-out">About Us</div>
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></div>
                    </div>
                </Link>
                <Link to="/contactus">
                    <div className="cursor-pointer group relative">
                        <div className="group-hover: transition duration-300 ease-in-out">Contact Us</div>
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></div>
                    </div>
                </Link>
            </div>

            {user?._id && (
                <div className="relative text-white flex flex-col items-center group">
                    <Link 
                        to={"/cart"} 
                        className="flex items-center space-x-2 text-xl p-2 rounded-md transition-all duration-500 ease-in-out group-hover:translate-x-4">
                        <SlHandbag className="transition-all duration-300 ease-in-out group-hover:rotate-180 group-hover:scale-110" />
                        <div className="text-sm">Cart ({context?.cartProductCount})</div>
                    </Link>
                    <p className="mt-2 text-lg font-semibold">{displayMadCurrency(totalPrice)}</p>
                </div>
            )}
        </div>
    );
};

export default Navbar;
