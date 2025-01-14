import React, { useState, useEffect } from "react";
import logo from "./logo.png";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("assigned_to");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks");
      if (!response.ok) {
        throw new Error("Failed to get tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error getting tasks:", error);
      alert("Error getting tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const toggleStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status === "pending" ? "completed" : "pending" }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task status:", error);
      alert("Failed to toggle task status");
    }
  };


  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };


  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditDescription(task.description);
  };


  const saveDescription = async (id) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: editDescription }),
      });
      setEditTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error saving description:", error);
      alert("Failed to update task");
    }
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditDescription("");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      (searchType === "assigned_to" && task.assigned_to.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (searchType === "title" && task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

    return (
       <div className="container mx-auto mt-6">
            <img src={logo}
                    alt="Logo"
                    className="absolute top-4 right-4 w-20 h-20 rounded-full border-4 border-white shadow-lg"/>
         <h1 className="text-4xl font-bold text-center mb-6">Task List</h1>

         <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
           <input
             type="text"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search"
             className="border border-gray-300 p-2 rounded w-full md:w-1/3"
           />
           <select
             value={searchType}
             onChange={(e) => setSearchType(e.target.value)}
             className="border border-gray-300 p-2 rounded w-full md:w-1/6"
           >
             <option value="assigned_to">Assigned To</option>
             <option value="title">Task Name</option>
           </select>
         </div>

         <div className="mb-4 flex gap-4 justify-center">
           {["all", "pending", "completed"].map((status) => (
             <button
               key={status}
               onClick={() => setFilter(status)}
               className={`px-6 py-2 rounded ${filter === status? "bg-blue-500 text-white": "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition`}>
               {status.charAt(0).toUpperCase() + status.slice(1)}
             </button>
           ))}
         </div>

         <div className="overflow-x-auto">
           <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
             <thead className="bg-gray-100">
               <tr>
                 {["Title", "Description", "Assigned To", "Created At", "Updated At", "Status", "Actions"].map(
                   (header) => (
                     <th key={header} className="px-6 py-3 border text-left text-sm font-medium text-gray-700">
                       {header}
                     </th>
                   )
                 )}
               </tr>
             </thead>
             <tbody>
               {filteredTasks.map((task, index) => (
                 <tr
                   key={task._id}
                   className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
                 >
                   <td className="px-6 py-4 border">{task.title}</td>
                   <td className="px-6 py-4 border">
                     {editTaskId === task._id ? (
                       <input
                         type="text"
                         value={editDescription}
                         onChange={(e) => setEditDescription(e.target.value)}
                         className="w-full border border-gray-300 p-2 rounded"
                       />
                     ) : (
                       task.description
                     )}
                   </td>
                   <td className="px-6 py-4 border">{task.assigned_to}</td>
                   <td className="px-6 py-4 border">{new Date(task.created_at).toLocaleString()}</td>
                   <td className="px-6 py-4 border">{new Date(task.updated_at).toLocaleString()}</td>
                   <td className="px-6 py-4 border">
                     <span
                       className={`px-3 py-1 rounded text-sm ${
                         task.status === "pending"
                           ? "bg-yellow-100 text-yellow-700"
                           : "bg-green-100 text-green-700"
                       }`}
                     >
                       {task.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 border flex justify-center gap-2">
                     {editTaskId === task._id ? (
                       <>
                         <button
                           onClick={() => saveDescription(task._id)}
                           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                         >
                           Save
                         </button>
                         <button
                           onClick={cancelEdit}
                           className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                         >
                           Cancel
                         </button>
                       </>
                     ) : (
                       <>
                         <button
                           onClick={() => handleEdit(task)}
                           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                         >
                           Edit
                         </button>
                         <button
                           onClick={() => toggleStatus(task._id, task.status)}
                           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                         >
                           Toggle
                         </button>
                         <button
                           onClick={() => deleteTask(task._id)}
                           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                         >
                           Delete
                         </button>
                       </>
                     )}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   }

export default TaskList;
