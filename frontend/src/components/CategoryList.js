import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      if (!response.ok) {
        throw new Error("Erreur de chargement.");
      }
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const categories = [
    { name: "Foundation", path: "Foundation" },
    { name: "Eyeshadow", path: "Eyeshadow" },
    { name: "Lip Gloss", path: "Lip Gloss" },
    { name: "Blush", path: "Blush" },
    { name: "Concealer", path: "Concealer" },
    { name: "Powder", path: "Powder" },
    { name: "Highlighter", path: "Highlighter" },
    { name: "Eye-liner", path: "Eye-liner" },
    { name: "Mascara", path: "Mascara" },
    { name: "Lipstick", path: "Lipstick" },
    { name: "Body Makeup", path: "Body Makeup" },
    { name: "Primer", path: "Primer" },
  ];

  return (
    <div className="p-8 bg-[#eb3986]">
      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/product-category?category=${category.path}`}
              className="w-full flex items-center justify-center"
            >
              <button
                className="bg-[#d46a90] w-full text-white px-5 py-2 text-sm font-medium rounded-full shadow-md
                  transform transition duration-300 ease-in-out 
                  hover:translate-y-1 hover:scale-110 hover:rotate-3"
              >
                {category.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
