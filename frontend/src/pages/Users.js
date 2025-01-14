import React, { useState, useEffect } from "react";
import AddUser from "../components/AddUser";
import UserList from "../components/UserList";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error displaying users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <AddUser setUsers={setUsers} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default Users;

