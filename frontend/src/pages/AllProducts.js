import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    console.log("Product data:", dataResponse);
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center rounded-lg mb-6">
        <h1 className="font-bold text-2xl text-gray-700">All Products</h1>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full focus:outline-none"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProduct.map((product, index) => (
          <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
        ))}
      </div>

      {/* Upload Product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
}

export default AllProducts
