import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight ,  FaStar} from 'react-icons/fa';

import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProducts";
import displayMadCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(categoryProduct?.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    if (loading) {
        return (
            <div className='flex gap-4 overflow-x-auto px-8'>
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className='flex-shrink-0 min-w-[150px] max-w-[200px] h-80 bg-gradient-to-r from-[#e3f2fd] to-[#b3e5fc] rounded-lg shadow-md flex flex-col p-3 animate-pulse'
                    >
                        <div className='flex-grow bg-[#cfd8dc] rounded-md mb-3 h-36'></div>
                        <div className='h-5 bg-[#cfd8dc] rounded w-3/4 mb-2'></div>
                        <div className='h-4 bg-[#cfd8dc] rounded w-1/2 mb-2'></div>
                        <div className='flex gap-2'>
                            <div className='h-4 bg-[#cfd8dc] rounded w-1/3'></div>
                            <div className='h-4 bg-[#cfd8dc] rounded w-1/4'></div>
                        </div>
                        <div className='mt-3 h-8 bg-[#cfd8dc] rounded w-full'></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) return <div className="text-center text-red-600">Error: {error}</div>;

    return (
        <div className='container mx-auto px-8 my-6'>
            <h2 className='text-2xl font-bold mb-4 text-center text-[#34495e]'>{heading}</h2>
            <div className='flex items-center'>
                <button
                    onClick={() => document.getElementById(`scroll-container-${category}`).scrollBy({ left: -320, behavior: 'smooth' })}
                    className='p-2 text-2xl font-bold'
                    aria-label="Scroll left"
                >
                    <FaArrowLeft className='text-[#646566] hover:text-[#434344]' />
                </button>

                <div
                     id={`scroll-container-${category}`}
                     className={`flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide  `}
                     style={{ minWidth: "100%" }}
                >
                    {data.map((product, index) => (
                        <Link to={`/product/${product?._id}`}
                            key={product._id || index}
                            className='flex-shrink-0 min-w-[240px] max-w-[240px] rounded-lg shadow-md p-4 relative border-4 border-solid border-gradient-to-r from-[#ffffff] to-[#f3f4f6]  h-90 bg-white '
                        >
                            <div className='h-40 w-full flex items-center justify-center   overflow-hidden'>
                                {product.productImages && product.productImages.length > 0 ? (
                                    <img
                                        src={product.productImages[0]}
                                        alt={product.productName}
                                        className='object-contain h-full w-full transition-transform duration-300 hover:scale-105'
                                    />
                                ) : (
                                    <span className='text-gray-500'>No Image Available</span>
                                )}
                            </div>
                            <div className='mt-4'><h3 className='text-sm font-semibold text-[#333] line-clamp-1'>{product.productName}</h3>
                            <p className='text-xs text-gray-500 mt-1 capitalize'>{product?.category}</p>
                            <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm font-bold text-[#659572]">
                    {displayMadCurrency(product.selling)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    {displayMadCurrency(product.price)}
                  </p>
                </div>
                 {/* Ratings */}
                 <div className="flex items-center gap-1 mt-3 text-xs text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
                <span className="text-gray-500 ml-1">(1712)</span>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-yellow-500">
                
               
                <button
                className="mt-4 w-full text-xs py-2 bg-gradient-to-r from-[#ffffff] to-[#606369]  text-white px-5 font-medium rounded-full shadow-md
                transform transition duration-300 ease-in-out 
                hover:translate-y-1 hover:scale-110 hover:rotate-3"
                onClick={(e) => handleAddToCart(e, product._id)}
              >
                Add to Cart
              </button>
              </div>
                           </div>
                            
                        </Link>
                    ))}
                </div>

                <button
                    onClick={() => document.getElementById(`scroll-container-${category}`).scrollBy({ left: 320, behavior: 'smooth' })}
                    className='p-2 text-2xl font-bold'
                    aria-label="Scroll right"
                >
                    <FaArrowRight className='text-[#646566] hover:text-[#434344]' />
                </button>
            </div>
        </div>
    );
};

export default VerticalCardProduct;
