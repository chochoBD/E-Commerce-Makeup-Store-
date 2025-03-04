import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProducts';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          loadingList.map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#ffffff] to-[#f3f4f6] rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="bg-slate-200 h-48 mb-4"></div>
              <div className="h-6 bg-slate-200 mb-2"></div>
              <div className="h-6 bg-slate-200 mb-2"></div>
              <div className="h-6 bg-slate-200 mb-2 w-1/2"></div>
            </div>
          ))
        ) : (
          data.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product?._id}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              onClick={scrollTop}
            >
              <div className="h-48 flex justify-center items-center mb-4">
                <img
                  src={product.productImages[0]}
                  alt={product.productName}
                  className="object-contain h-full w-auto hover:scale-110 transition-transform"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-lg text-gray-800 line-clamp-2">
                  {product?.productName}
                </h3>
                <p className="capitalize text-gray-500 text-sm">{product?.category}</p>
                <div className="flex gap-3 items-center">
                  <p className="text-[#2ecc71] font-medium">
                    {displayINRCurrency(product?.selling)}
                  </p>
                  {product?.price && product.selling !== product.price && (
                    <p className="text-gray-400 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  )}
                </div>
                <button
                  className="mt-2 px-3 py-1 bg-[#646566] text-white rounded-full hover:bg-[#434344] transition-colors"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Bag
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
