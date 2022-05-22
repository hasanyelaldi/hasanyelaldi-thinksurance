const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');

const connectDB = require('./config/dbConn');
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Built-in middleware for json 
app.use(express.json())

// Middleware for cookies
app.use(cookieParser());

// Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// Secure Routes
app.use(verifyJWT);
app.use('/', require('./routes/index'))

app.listen(port, () => {
    console.log(`Gateway listening on port ${port}`)
})

module.exports = app;