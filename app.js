const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
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

app.get('/testSnow', async (req, res) => {
    //const trailer = await Trailer.findById(req.params.id);
    axios.post('https://dev85450.service-now.com/api/422579/testtrailer',{
        manufacturer:"ddemo manufacturer",
        model:"dnasjkdbn"
    }, {
        headers: { Authorization: "Basic cmVzdC50ZXN0aW5nOmFkbWluMTEx" }
    })
    .then((res) => {
        res.json(res);
    })
    .catch((error) => {
        res.json(error);
    });
});

// Routes
/*app.get('/', (req, res) => {
    res.send('We are on home');
});*/

// Listen
app.listen(3000);