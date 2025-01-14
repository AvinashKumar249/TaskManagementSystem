import React, { useState, useEffect } from "react";
import logo from "./logo.png";
function AddTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigned_to: "",
  });
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Task added successfully!");
    setFormData({ title: "", description: "", assigned_to: "" });
  };

  return (
    <div>
          <img   src={logo}
                  alt="Logo"
                  className="absolute top-4 right-4 w-20 h-20 rounded-full border-4 border-white shadow-lg"/>
      <h1 className="text-2xl font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required className="w-full border border-gray-300 p-2">
          </textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Assigned To:</label>
          <select
            value={formData.assigned_to}
            onChange={(e) =>
              setFormData({ ...formData, assigned_to: e.target.value })
            }
            required
            className="w-full border border-gray-300 p-2">
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
