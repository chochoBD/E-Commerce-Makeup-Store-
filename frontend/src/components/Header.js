import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { ImSearch } from 'react-icons/im';
import { FaRegUser } from 'react-icons/fa';
import { LiaShoppingCartSolid } from 'react-icons/lia';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenuDisplay, setMobileMenuDisplay] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLsearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLsearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)
  

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuDisplay((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuDisplay(false);
  };

  const handleSearch = (e) =>{
    
    const { value } = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }
  }

  return (
    <header className="h-20 bg-white shadow-md fixed w-full z-40">
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
        {/* Logo */}
        <Link to="/">
          <Logo w={90} h={60} />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-grow mx-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 border rounded-l-md focus:outline-none focus:ring-2"
            onChange={handleSearch}
            value={search}
          />
          <button className="bg-[#d46a90]  text-white p-2 rounded-r-md hover:bg-[#a83667] transition duration-200">
            <ImSearch />
          </button>
        </div>
        
        {/* Search Icon for Mobile */}
        <div className="lg:hidden flex flex-grow justify-center">
          <div className="relative">
            <button
              onClick={() => setSearchVisible((prev) => !prev)}
              className="text-3xl cursor-pointer transition duration-200 p-3 rounded-full  hover:bg-[#F3F4F6]"
            >
              <ImSearch />
            </button>
            {searchVisible && (
              <form className="absolute top-16 left-1/2 transform -translate-x-1/2 max-w-md w-60 bg-white rounded-lg shadow-lg p-2">
                <label htmlFor="mobile-search" className="sr-only">Search</label>
                <div className="flex items-center">
                  <input
                    type="search"
                    id="mobile-search"
                    className="block w-full p-2 text-lg text-gray-900 border border-gray-300 rounded-l-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out"
                    placeholder="Search..."
                    onChange={handleSearch}
                    value={search}
                    required
                  />
                  
                </div>
              </form>
            )}
          </div>
        </div>

        {/* User Profile and Cart */}
        <div className="flex items-center space-x-4">
          {/* Shopping Cart 
          {
          user?._id && (
               <Link to={"/cart"} className="relative text-2xl cursor-pointer hover:bg-[#222324] transition duration-200">
            <LiaShoppingCartSolid />
            <div className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-2">{context?.cartProductCount}</div>
          </Link>
              )
              
            }*/}

          {/* Profile and Logout - Mobile Dropdown */}
          <div className="lg:hidden relative">
            <div className="text-xl cursor-pointer" onClick={toggleMobileMenu}>
              {user?._id ? (
                <div className="h-10 w-10 flex items-center justify-center bg-[#F3F4F6] text-black rounded-full font-bold">
                  {user.name[0].toUpperCase()}
                </div>
              ) : (
                <FaRegUser className="text-gray-800 hover:bg-[#646566] transition duration-200" />
              )}
            </div>

            {mobileMenuDisplay && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                <ul>
                  {user?.role === ROLE.ADMIN && (
                    <li>
                      <Link
                        to="/admin-panel/all-products"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={closeMobileMenu}
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="border-gray-200" />
                  </li>
                  <li>
                    {user?._id ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link to="/Login" className="block px-4 py-2 text-[#] hover:bg-gray-100" onClick={closeMobileMenu}>
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* User Profile - Desktop */}
          <div className="hidden lg:flex items-center relative">
            {user?._id && (
              <div
                className="text-xl cursor-pointer"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user.name ? (
                  <div className="h-10 w-10 flex items-center justify-center bg-[#F3F4F6] text-black rounded-full font-bold">
                    {user.name[0].toUpperCase()}
                  </div>
                ) : (
                  <FaRegUser className="text-gray-800 hover:bg-[#646566] transition duration-200" />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute z-10 bg-white top-full mt-2 w-48 p-3 shadow-lg rounded-lg border border-gray-200">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
         

          {/* Login / Logout Button - Desktop */}
          <div className="hidden lg:block">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-[#d46a90]  text-white px-4 py-2 rounded-full hover:bg-[#646566] transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link to="/Login">
                <button className="bg-[#d46a90]  text-white px-4 py-2 rounded-full hover:bg-[#646566] transition duration-200">
                  Login
                </button>
              </Link>
            )}
          </div>
        
        </div>
      </div>
    </header>
  );
};

export default Header;
