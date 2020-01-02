const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err) => {
        if (err) throw err;
        else console.log('connected to DB!');
    });

// Middlewares
// Parses the body as a json object
app.use(bodyParser.json());
app.use(express.json({extended : false}));

// Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

// Listen
app.listen(3000);