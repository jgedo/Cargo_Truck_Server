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
//const postsRoute = require('./routes/posts');
const trailersRoute = require('./routes/trailers');

//app.use('/posts', postsRoute);
app.use('/api/trailers', trailersRoute);

// Routes
app.get('/', function(req, res) {
    //res.send('hello');
});

// Listen
app.listen(process.env.PORT || 3000);