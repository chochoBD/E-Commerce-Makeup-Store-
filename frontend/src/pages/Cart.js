import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import SummaryApi from "../common";
import Context from "../context";
import displayMadCurrency from "../helpers/displayCurrency";
import { SlHandbag } from "react-icons/sl";
import image10 from "../assest/1.PNG";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.UpdateCartProduct.url, {
        method: SummaryApi.UpdateCartProduct.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ _id: id, quantity: qty + 1 }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        console.error("Error increasing quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      try {
        const response = await fetch(SummaryApi.UpdateCartProduct.url, {
          method: SummaryApi.UpdateCartProduct.method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ _id: id, quantity: qty - 1 }),
        });
        const responseData = await response.json();

        if (responseData.success) {
          setData((prevData) =>
            prevData.map((item) =>
              item._id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
          );
        } else {
          console.error("Error decreasing quantity:", responseData.message);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.DeleteCartProduct.url, {
        method: SummaryApi.DeleteCartProduct.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ _id: id }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        console.error("Error deleting product:", responseData.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = data.reduce(
    (sum, item) => sum + item.productId?.selling * item.quantity,
    0
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 ">
      <h2 className="text-center text-3xl text-pink-600 font-bold flex items-center justify-center gap-2 mb-8">
        My Bag <SlHandbag className="text-2xl" />
      </h2>

      {data.length === 0 && !loading && (
        <p className="text-center bg-gray-100 text-gray-600 py-6 rounded-md">
          No items in the cart
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="w-full lg:w-3/5">
          {loading ? (
            loadingCart.map((_, index) => (
              <div
                key={index}
                className="w-full bg-gray-200 h-32 my-2 rounded-md animate-pulse shadow-sm"
              ></div>
            ))
          ) : (
            data.map((product) => (
              <div
                key={product._id}
                className="flex items-center bg-white shadow-sm h-50 my-4 border border-gray-300 rounded-md p-4"
              >
                <div className="w-24 h-28 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={product.productId?.productImages[0]}
                    alt={product.productId?.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h1 className="text-lg font-medium text-gray-800">
                    {product.productId?.productName}
                  </h1>
                  <p className="text-sm text-gray-500 capitalize">
                    {product.productId?.category}
                  </p>
                  <div className="flex justify-between mt-2">
                    <p className="text-pink-600 font-semibold">
                      {displayMadCurrency(product.productId?.selling)}
                    </p>
                    <p className="text-gray-800 font-medium">
                      {displayMadCurrency(
                        product.productId?.selling * product.quantity
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      className="w-8 h-8 bg-pink-100 text-pink-600 rounded hover:bg-pink-400 hover:text-white transition"
                      onClick={() =>
                        decreaseQty(product._id, product.quantity)
                      }
                    >
                      -
                    </button>
                    <span className="text-gray-800">{product.quantity}</span>
                    <button
                      className="w-8 h-8 bg-pink-100 text-pink-600 rounded hover:bg-pink-400 hover:text-white transition"
                      onClick={() =>
                        increaseQty(product._id, product.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <p> </p>
                <button
                
                  className="text-gray-400 p-4 hover:text-red-600 transition"
                  onClick={() => deleteCartProduct(product._id)}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-2/5 rounded-md  p-6">
          <h2 className="text-xl font-semibold text-gray-700">Summary</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-gray-700">
              <p>Total Quantity:</p>
              <p>{totalQty}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Total Price:</p>
              <p>{displayMadCurrency(totalPrice)}</p>
            </div>
            <button className="w-full bg-pink-600 text-white py-2 rounded mt-6 hover:bg-pink-700 transition">
              Proceed to Payment
            </button>
            
           
          </div>
     

        </div>
       
      
 
      </div>
    </div>
  );
};

export default Cart;
