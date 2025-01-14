import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./pages/Users";
//import Tasks from "./pages/Tasks";
import TasksPage from "./pages/TasksPage";
import AddTaskPage from "./pages/AddTaskPage";


function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link to="/users" className="mr-4 text-blue-500">Users</Link>
          <Link to="/tasks" className="mr-4 text-blue-500">Task List</Link>
          <Link to="/add-task" className="text-blue-500">Add Task</Link>
        </nav>
        <Routes>
          <Route path="/users" element={<Users />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<AddTaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

              


/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/


