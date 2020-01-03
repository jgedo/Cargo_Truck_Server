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
    axios.post('https://dev91990.service-now.com/api/440171/incoming_trailer', [
        {
            "image": {
                "contentType": "image/jpeg"
            },
            "_id": "5e0ea759ab30af3a489cc299",
            "title": "Big Tex Hauler 70CH-18BKDT",
            "manufacturer": "Big Tex Trailers",
            "price": 2685,
            "model": "70CH-18",
            "capacity": "m",
            "dimension": 400,
            "condition": "new",
            "color": "grey",
            "year": "2020",
            "quantity": 1,
            "__v": 0
        }
    ], {
        headers: { Authorization: "Basic YWRtaW46UmV2QHR1cmUwMSE=",
                   "Content-Type": "application/json" }
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