{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 User Guide for Local usage\
\
Install nodeJS and MongoDB community edition on your local system\
\pard\pardeftab720\partightenfactor0
\cf0 \
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0 cd backend\
npm install\
to install dependencies for the backend\
similarly for the frontend\
cd frontend\
npm install\
\
to run project,\
start mongod service as a background process\
brew services start mongodb-community@8.0\
test if service is active using \
open 2 terminals, one in the backend, one in the frontend\
for backend, run server using : npx nodemon server.js\
for frontend use npm start\
\
Once started, use the 3 buttons on top to navigate to the different pages,\
\
User tab contians User form to add users, and displays users, while providing the functionality to delete users.\
\
Task List tab contains list of all tasks that have been assigned to someone while showing all the details, with a toggle button to mark it as complete or incomplete, an edit button to edit the task description, a delete option to delete the task, and filters for pending and completed tasks, a search option for searching for either users who the task was assigned to, or the task name that was assigned.\
\
Add Task tab contains a form for adding tasks, along with a dropdown list for selecting users who can be assigned tasks.\
\
\
\
Sources used:\
Backend : \
https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/\
https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/\
\
Frontend :\
Tailwind CSS using :- https://flowbite.com/\
https://www.geeksforgeeks.org/create-todo-app-using-reactjs/\
\
\
What each files contain:\
Backend\
Schema:\
Task.js, User.js contain the respective schemas used in the database\
Routes cotnain the functions for the handling of the api calls for users and tasks respectively.\
\
Frontend\
\
Components:\
Components contain parts of functionality for each page, and are combined in the pages folder.\
AddUser.js and UserList.js contain the data for the adduser form\
AddTask.js contains data for the addTask form\
TaskList.js contains the data for displaying the tasks\
\
Pages:\
Users.js : User form, corresponds to AddUser.js and userList.js\
TasksPage.js : Corresponds to TaskList.js\
AddTaskPage.js : Corresponds to AddTask.js\
\
\
\
\
}