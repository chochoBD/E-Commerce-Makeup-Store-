import React, { useEffect, useState, useContext } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProducts";
import displayMadCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
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
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 my-6  "> {/* Light neutral gray background */}
      <h2 className="text-xl font-bold mb-4 text-center text-[#333]">{heading}</h2>
      <div className="flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={() =>
            document.getElementById(`scroll-container-${category}`).scrollBy({ left: -320, behavior: "smooth" })
          }
          className="p-2 text-2xl font-bold"
        >
          <FaArrowLeft className="text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        </button>

        {/* Product List */}
        <div
          id={`scroll-container-${category}`}
          className={`flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide `}
          style={{ minWidth: "100%" }}
        >
          {data.map((product, index) => (
            <div
              key={product._id || index}
              className="flex-shrink-0 min-w-[240px] max-w-[240px] bg-white rounded-lg shadow-md p-4 relative border-2 border-[#eb3986] border-solid"
            >
              {/* Discount Badge */}
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}

              {/* Product Image */}
              <Link to={`/product/${product._id}`}>
                <div className="h-40 w-full flex items-center justify-center  rounded-lg overflow-hidden">
                  {product.productImages && product.productImages.length > 0 ? (
                    <img
                      src={product.productImages[0]}
                      alt={product.productName}
                      className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="text-gray-500">No Image Available</div>
                  )}
                </div>
              </Link>

              {/* Product Details */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#333] line-clamp-1">{product.productName}</h3>
                <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm font-bold text-[#eb3986]">
                    {displayMadCurrency(product.selling)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    {displayMadCurrency(product.price)}
                  </p>
                </div>
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

              {/* Add to Cart Button */}
              <button
                className="mt-4 w-full text-xs py-2 bg-[#eb3986]  text-white px-5 font-medium rounded-full shadow-md 
                hover:scale-105 transform transition duration-300 ease-in-out"
                onClick={(e) => handleAddToCart(e, product._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() =>
            document.getElementById(`scroll-container-${category}`).scrollBy({ left: 320, behavior: "smooth" })
          }
          className="p-2 text-2xl font-bold"
        >
          <FaArrowRight className="text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
