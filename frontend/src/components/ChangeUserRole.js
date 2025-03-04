import React, { useState } from 'react';
import ROLE from '../common/role'
import { IoMdClose } from 'react-icons/io';
import SummaryApi from "../common";
import { toast } from 'react-toastify';

function ChangeUserRole({ name, email, role,userId, onClose ,callFunc}) {
    const [userRole, setUserRole] = useState(role); // Use the current role as the initial state

    // Handle role change
    const handleChangeRole = (e) => {
        setUserRole(e.target.value);
        console.log(e.target.value)
    };

    // Update user role API call
    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUer.url, {
            method: SummaryApi.updateUer.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId : userId,
                role: userRole
            })
        });
        const responseData = await fetchResponse.json();
        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
        
        
        console.log('Role updated', responseData);
        // Optionally, you can close the modal or show a success message here
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition" onClick={onClose}>
                    <IoMdClose size={24} />
                </button>

                <h1 className="text-2xl font-semibold text-center mb-4">Change User Role</h1>
                <p className="text-lg mb-2">Name: <span className="font-medium">{name}</span></p>
                <p className="text-lg mb-4">Email: <span className="font-medium">{email}</span></p>

                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={userRole}
                    onChange={handleChangeRole}
                >
                    {Object.values(ROLE).map((el) => (
                        <option value={el} key={el}>
                            {el}
                        </option>
                    ))}
                </select>

                <button
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
}

export default ChangeUserRole;
