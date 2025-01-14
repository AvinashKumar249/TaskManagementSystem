const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(taskRoutes);

mongoose.connect('mongodb://localhost:27017/taskManagement')
    .then(() => console.log('Connected Successfully'))
    .catch((err) => console.error('Connection Failed', err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

