const express = require('express');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
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
app.use(express.json({ extended: false }));

// Import Routes
//const postsRoute = require('./routes/posts');
const trailersRoute = require('./routes/trailers');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');

//app.use('/posts', postsRoute);
app.use(cors());
app.use('/api/trailers', trailersRoute);
app.use('/api/users', usersRoute);
app.use('/api/login', loginRoute);

/*
const Trailer = require('./models/Trailer');

function trailerToMsg(trailer) {
    let msgTrailer = {};
    
    if(trailer.image && trailer.image.data) {
        msgTrailer.image = {
            contentType: trailer.image.contentType,
            data: trailer.image.data.toString('base64'),
        };
    }

    msgTrailer._id = trailer._id;
    msgTrailer.title = trailer.title;
    msgTrailer.manufacturer = trailer.manufacturer;
    msgTrailer.price = trailer.price;
    msgTrailer.model = trailer.model;
    msgTrailer.capacity = trailer.capacity;
    msgTrailer.dimension = trailer.dimension;
    msgTrailer.condition = trailer.condition;
    msgTrailer.color = trailer.color;
    msgTrailer.year = trailer.year;
    msgTrailer.quantity = trailer.quantity;

    return msgTrailer;
}

app.get('/testSnow', async (req, res) => {
    const trailer = await Trailer.findById("5e126f73671145b0968be3f7");
    axios.post('https://dev91990.service-now.com/api/440171/incoming_trailer', [trailerToMsg(trailer)], {
        headers: {
            Authorization: "Basic YWRtaW46UmV2QHR1cmUwMSE=",
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            res.json(res);
        })
        .catch((error) => {
            res.json(error);
        });
});
*/

// Listen
app.listen(process.env.PORT || 3000);