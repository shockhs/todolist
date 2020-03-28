const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const http = require('http')

//PORT
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Import Router
const authRoute = require('./routes/auth')
const todoRoute = require('./routes/todo')
const router = require('./router')


dotenv.config();

// MongoDB connect
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log('Connected to DB')
    });

//Middleware 
app.use(express.json())
app.use(cors());


// Route Middleware
app.use(router)
app.use('/api/user', authRoute)
app.use('/api/todo', todoRoute)



server.listen(PORT, () => {
    console.log('Server up and running')
})
