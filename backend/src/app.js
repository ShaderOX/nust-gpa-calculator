const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const usersRouter = require('./routes/users');

const PORT = parseInt(process.env.PORT) || 5000;
const DB_CONNECTION = process.env.DB_CONNECTION || '';

const app = express();

// Setting up middleware
app.use(express.json());

// Setting up routes
app.use('/api/users/', usersRouter);


app.listen(PORT,
    (error) => console.log(error || `Server running at localhost:${PORT} ...`));
mongoose.connect(DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => console.log(error || "Connected to DB ..."));