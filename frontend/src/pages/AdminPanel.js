import React  ,{useEffect} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUser,FaSignOutAlt, FaRegUser } from 'react-icons/fa';
import { RiProductHuntFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import ROLE from '../common/role';

function AdminPanel() {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate()
    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate('/')
        }
    },[user])
  return (
    <div className="flex h-screen bg-gray-200">

  <aside className="w-64 bg-white shadow-lg customShadow">
    <br />
    <br />
                <div className='h-8 flex justify-center items-center'>
                    <div className='text-xl cursor-pointer'>
                        {user?.name ? (
                            <div className='h-10 w-10 flex items-center justify-center bg-[#EF4444] text-white rounded-full font-bold'>
                                {user.name[0].toUpperCase()}
                            </div>
                        ) : (
                            <FaRegUser className='text-gray-800 hover:bg-[#646566] transition duration-200' />
                        )}
                    </div>
                </div>

                <div className="p-5 border-b">
                    <h2 className="text-2xl font-semibold flex justify-center">{user?.name}</h2>
                    <p className="text-sm flex justify-center">{user?.role}</p>
                </div>
                <nav className="mt-5">
                    <ul>
                        <li>
                            <Link to="all-users" className="flex items-center p-3 hover:bg-gray-100">
                                <FaUser className="mr-2" />Users
                            </Link>
                        </li>
                        <li>
                            <Link to="all-products" className="flex items-center p-3 hover:bg-gray-100">
                                <RiProductHuntFill className="mr-2" />Products
                            </Link>
                        </li>
                    
                        <li>
                            <Link to="/logout" className="flex items-center p-3 hover:bg-gray-100">
                                <FaSignOutAlt className="mr-2" />Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

    {/* Main Content */}
    <main className="flex-1 p-6 overflow-auto bg-gray-100">
        <br />
        <Outlet />
    </main>
</div>
);
};
export default AdminPanel

