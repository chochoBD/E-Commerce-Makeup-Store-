import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCategory from "../helpers/ProductCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from '../common';
import image6 from '../assest/D-LOYALTY-BANNER.jpg';

const CategoryProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: filterCategoryList
      })
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName;
      }
      return null;
    }).filter(el => el);
    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => 
      (arrayOfCategory.length - 1) === index ? `category=${el}` : `category=${el}&&`
    );
    navigate("/product-category?" + urlFormat.join(''));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target;
    setSortBy(value);
    if (value === 'asc') {
      setData(preve => preve.sort((a, b) => a.selling - b.selling));
    }

    if (value === 'dsc') {
      setData(preve => preve.sort((a, b) => b.selling - a.selling));
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='bg-[#eb3986] w-full'>
        <div className='h-80 w-full bg-[#eb3986] relative overflow-hidden'>
          <div className='absolute inset-0 flex'>
            <img 
              src={image6} 
              className='w-full h-full object-cover'
              alt="Banner"
            />
          </div>
        </div>
      </div>

      {/* Desktop version */}
      <div className='hidden lg:grid grid-cols-[350px,1fr] gap-4 flex-grow'>
        
        {/* Left side - Filter Section */}
        <div className='bg-white p-4 rounded-md shadow-md min-h-[calc(100vh-120px)] overflow-y-auto'>
          {/* Sort by Section */}
          <div className='mb-6'>
            <h3 className='text-base font-medium text-slate-600 uppercase mb-2 text-center border-b border-slate-400 pb-2'>
              Sort By
            </h3>
            <form className='flex flex-col items-center gap-3'>
              <div className='flex items-center gap-2'>
                <input type="radio" name='sortBy' value={"asc"} className='form-radio' checked={sortBy === "asc"} onChange={handleOnChangeSortBy} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-2'>
                <input type="radio" name='sort' value={'dsc'} className='form-radio' checked={sortBy === "dsc"}  onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Category Filter Section */}
          <div className='mb-6'>
            <h3 className='text-base font-medium items-center text-slate-600 uppercase mb-2 text-center border-b border-slate-400 pb-2'>
              Product Type
            </h3>
            <form className='flex items-center flex-col gap-3'>
              {ProductCategory.map((categoryName, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <input 
                    type="checkbox" 
                    name="category" 
                    checked={selectCategory[categoryName?.value]} 
                    value={categoryName?.value} 
                    id={categoryName?.value} 
                    onChange={handleSelectCategory} 
                    className='form-checkbox'
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side - Products Display */}
        <div className='p-4'>
          <p className='text-lg font-semibold mb-4'>Search Results: {data.length}</p>
          <div>
            {data.length !== 0 ? (
              <VerticalCard data={data} loading={loading} />
            ) : (
              <p className='text-gray-500'>No products found for the selected category.</p>
            )}
          </div>
        </div>

      </div>

      {/* Mobile version */}
      <div className='lg:hidden'>
        
        {/* Sort by and Filter Section */}
        <div className='bg-white p-4 rounded-md shadow-md'>
          {/* Sort by Section */}
          <div className='mb-4'>
            <h3 className='text-base font-medium text-slate-600 uppercase mb-2 text-center border-b border-slate-400 pb-2'>
              Sort By
            </h3>
            <form className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <input type="radio" name='sortBy' value={'asc'} className='form-radio' checked={sortBy === "asc"} onChange={handleOnChangeSortBy} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-2'>
                <input type="radio" name='sort' value={'dsc'} className='form-radio' checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Category Filter Section */}
          <div className='mb-4'>
            <h3 className='text-base font-medium text-slate-600 uppercase mb-2 text-center border-b border-slate-400 pb-2'>
              Category
            </h3>
            <form className='flex flex-col gap-3'>
              {ProductCategory.map((categoryName, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <input 
                    type="checkbox" 
                    name="category" 
                    checked={selectCategory[categoryName?.value]} 
                    value={categoryName?.value} 
                    id={categoryName?.value} 
                    onChange={handleSelectCategory} 
                    className='form-checkbox'
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Mobile Product Display */}
        <div className='bg-white p-4 mt-4'>
          <p className='text-base font-semibold mb-4'>Search Results: {data.length}</p>
          <div>
            {data.length !== 0 ? (
              <VerticalCard data={data} loading={loading} />
            ) : (
              <p className='text-gray-500'>No products found for the selected category.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

export default CategoryProducts;
