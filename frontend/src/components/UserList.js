import React, { useState, useEffect } from "react";
import logo from "./logo.png";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error("Error displaying users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error displaying users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    setUsers(users.filter((user) => user._id !== id));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

    
return (
    <div className="container mx-auto mt-6">
        <img src={logo} alt="Logo" className="absolute top-4 right-4 w-20 h-20 rounded-full border-4 border-white shadow-lg"/>
         <h2 className="text-4xl font-bold text-center mb-6">All Users</h2>
         <div className="overflow-x-auto">
           <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
             <thead className="bg-gray-100">
               <tr>
                 <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Name</th>
                 <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Email</th>
                 <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">Actions</th>
               </tr>
             </thead>
             <tbody>
               {users.map((user, index) => (
                 <tr key={user._id}
                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                   <td className="px-6 py-4 border-b text-sm text-gray-700">
                     {user.name}
                   </td>
                   <td className="px-6 py-4 border-b text-sm text-gray-700">
                     {user.email}
                   </td>
                   <td className="px-6 py-4 border-b text-center">
                     <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                       onClick={() => deleteUser(user._id)}>
                       Delete
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   }


export default UserList;

