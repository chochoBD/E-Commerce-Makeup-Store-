import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayMadCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/verticalCardProduct";
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import image9 from '../assest/Capture.PNG';
import Context from '../context';

const DetailsProduct = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    price: "",
    selling: "",
  });
  const [loading, setLoading] = useState(true);
  const [activateImage, setActivateImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const params = useParams();
  const productImageListLoading = new Array(4).fill(null);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
 

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate('/cart');
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.ProductDetails.url, {
        method: SummaryApi.ProductDetails.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: params?.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActivateImage(dataResponse?.data?.productImages[0] || "");
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActivateImage(imageUrl);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };
;

  return (
    <div className="container mx-auto p-6 ">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center lg:items-start rounded-lg p-4 lg:p-6 ">
        
        {/* Product Image Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-1/2 gap-4">
          {/* Main Image with Zoom Effect */}
          <div
            className="h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-lg overflow-hidden relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={activateImage}
              alt="Active Product"
              className={`h-full w-full object-contain transition-transform duration-300 ease-in transform ${isZoomed ? "scale-150" : "scale-100"}`}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          </div>

          {/* Thumbnails in a Horizontal Layout on Smaller Screens */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {loading ? (
              productImageListLoading.map((_, index) => (
                <div
                  className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-300 rounded-lg animate-pulse"
                  key={`loadingImage-${index}`}
                ></div>
              ))
            ) : (
              data?.productImages?.map((imgUrl, index) => (
                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-300 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg" key={imgUrl}>
                  <img
                    src={imgUrl}
                    alt={`Product thumbnail ${index + 1}`}
                    className="h-full w-full object-contain cursor-pointer transition-transform transform hover:scale-110"
                    onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                    onClick={() => handleMouseEnterProduct(imgUrl)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className={`flex flex-col gap-6 lg:w-1/2 transition-opacity duration-500 ease-in ${loading ? "opacity-0" : "opacity-100"}`}>
          <h1 className="bg-red-200 text-center text-red-700 px-3 py-1 rounded-full inline-block">{data.brandName}</h1>
          <p className="text-2xl lg:text-4xl font-bold text-gray-800">{data.productName}</p>
          <p className="text-sm md:text-lg text-gray-500">{data.category}</p>
          <div className="text-yellow-500 flex items-center gap-1">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
          </div>
          <div className="flex items-center gap-4 text-xl md:text-2xl lg:text-3xl font-semibold my-2">
            <p className="text-pink">{displayMadCurrency(data?.selling)}</p>
            {data.price && data.selling !== data.price && (
              <p className="text-gray-400 line-through">{displayMadCurrency(data?.price)}</p>
            )}
          </div>
          <div className="flex gap-4">
            <button className="mt-4 w-full text-xs py-2 bg-[#eb3986]  text-white px-5 font-medium rounded-full shadow-md 
                hover:scale-105 transform transition duration-300 ease-in-out" onClick={(e) => handleBuyProduct(e, data?._id)}>Buy Now</button>
            <button className="mt-4 w-full text-xs py-2 bg-[#7c495f]  text-white px-5 font-medium rounded-full shadow-md 
                hover:scale-105 transform transition duration-300 ease-in-out" onClick={(e) => handleAddToCart(e, data?._id)}>Add to Bag</button>
          </div>
          
        </div>
      </div>
      <div className='bg-[#eb3986]'>
      <div className='h-full md:h-80 w-full bg-bg-[#eb3986] relative overflow-hidden'>
        <div className='absolute inset-0 flex'>
          <img 
            src={image9} 
            
            className='w-full h-80 object-cover'
          />
        </div>
      </div>
      
    </div>
    <div className="mt-6">
     
      <p
        className="text-gray-700 font-semibold cursor-pointer flex items-center"
     
      >
        Description:
       
      </p>

      
        <p className="text-gray-600 mt-2 transition-opacity duration-300">
          {data.description}
        </p>
   
    </div>

      {/* Recommended Products */}
      {data?.category && (
        <div className="mt-12">
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"} />
        </div>
      )}
    </div>
  );
};

export default DetailsProduct;
