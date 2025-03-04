import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import AdminEditProduct from '../components/AdminEditProduct';
import displayMadCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300 max-w-sm">
      {/* Product Image */}
      <div className='w-32 h-32 flex justify-center items-center'>
         <img
        src={data?.productImages[0]}
        alt={data.productName}
        className="mx-auto object-fill h-full"
      />
      </div>
     

      {/* Product Name */}
      <h1 className="text-ellipsis line-clamp-2">
        {data.productName}
      </h1>

      {/* Product Price */}
      <div className="text-green-600 font-bold text-lg">
        {displayMadCurrency(data?.selling)}
      </div>

      {/* Edit Button */}
      <div
        className="flex justify-center items-center p-2 bg-green-100 hover:bg-green-600 rounded-full cursor-pointer hover:text-white transition-all duration-300"
        onClick={() => setEditProduct(true)}
      >
        <MdEdit size={20} />
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          Productdata={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
