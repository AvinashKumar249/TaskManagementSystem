import React, { useState } from "react";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        console.error("Failed to add user");
        alert("Failed to add user");
        return;
      }

      const newUser = await response.json();
      //alert("User added");
      setName("");
      setEmail("");
        window.location.reload();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-300 p-2"/>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Add User
      </button>
    </form>
  );
}

export default AddUser;
