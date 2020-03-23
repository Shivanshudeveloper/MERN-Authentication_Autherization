// Express
const express = require('express');
const cookieParser = require("cookie-parser");
// MongoDB
const mongoose = require('mongoose');


// Initializing app
const app = express();
// Cookie Parser
app.use(cookieParser());
app.use(express.json());


// DB Connection
const db = require('./config/keys').MongoURI;
// Connect MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('MongoDB Connected') )
    .catch(err => console.log(err));

const userRoute = require('./routes/User');
app.use('/user', userRoute);

// Getting PORT set
const PORT = process.env.PORT || 5000;
// Starting the server
app.listen(PORT, console.log('Server Started On Port', PORT));