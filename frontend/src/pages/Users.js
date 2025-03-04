import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import moment from 'moment';
import ChangeUserRole from '../components/ChangeUserRole';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: '',
  });

  const fetchUsers = async () => {
    try {
      const fetchdata = await fetch(SummaryApi.Users.url, {
        method: SummaryApi.Users.method,
        credentials: 'include',
      });
      const dataResponse = await fetchdata.json();
      if (dataResponse.success) {
        setUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  // Handle delete action
 // Handle delete action
const handleDeleteUser = async (userId) => {
  try {
    const url = SummaryApi.deleteUser.url.replace(':userId', userId); // Replace the placeholder with actual user ID

    const response = await fetch(url, {
      method: SummaryApi.deleteUser.method, // DELETE request for deleting user
      credentials: 'include',
    });

    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      fetchUsers(); // Refresh the users list after deletion
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Failed to delete user');
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mb-6">User Management</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Sr. </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Created</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4 text-sm text-gray-800">{index + 1}</td> {/* Sr. No */}
                <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{user.email}</td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'Admin' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{moment(user.createdAt).format('LL')}</td>
                <td className="py-3 px-4 flex justify-center space-x-4">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => handleDeleteUser(user._id)} // Call delete function
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Role Modal */}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchUsers}
        />
      )}
    </div>
  );
};

export default Users;
