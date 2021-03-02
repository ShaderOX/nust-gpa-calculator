const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');

const PORT = parseInt(process.env.PORT) || 5000;
const DB_CONNECTION = process.env.DB_CONNECTION || '';

const app = express();
app.use(cors());

// Setting up middleware
app.use(express.json());

// Setting up routes
app.use('/api/users/', usersRouter);
app.use('/api/courses/', coursesRouter);


app.listen(PORT,
    (error) => console.log(error || `Server running at localhost:${PORT} ...`));
mongoose.connect(DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => console.log(error || "Connected to DB ..."));