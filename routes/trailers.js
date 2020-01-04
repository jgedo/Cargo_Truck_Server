const express = require('express');

const router = express.Router();
const fs = require('fs');

const Trailer = require('../models/Trailer');
const axios = require('axios');

const imgPathTest = './images/test.png';


/*router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

router.get('/', async (req, res) => {
    try {
        const trailers = await Trailer.find();
        res.json(trailers);
    } catch (err) {
        res.json({ message: err });
    };
});

router.get('/:id', async (req, res) => {
    try {
        const trailer = await Trailer.findById(req.params.id);
        res.json(trailer);
    } catch (err) {
        res.json({ message: err });
    };
});

router.post('/', async (req, res) => {
    let trailer = new Trailer({
        title: req.body.title,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        model: req.body.model,
        capacity: req.body.capacity,
        dimension: req.body.dimension,
        condition: req.body.condition,
        color: req.body.color,
        year: req.body.year,
        quantity: req.body.quantity
        //image: req.body.image,
    });

    //trailer.image.data = fs.readFileSync(imgPathTest);
    trailer.image.contentType = 'image/png';

    try {
        const savedTrailer = await trailer.save();
        axios.post('https://dev91990.service-now.com/api/440171/incoming_trailer', [
            {
                "image": {
                    "contentType": "image/jpeg"
                },
                "_id": savedTrailer._id,
                "title": req.body.title,
                "manufacturer": req.body.manufacturer,
                "price": req.body.price,
                "model": req.body.model,
                "capacity": req.body.capacity,
                "dimension": req.body.dimension,
                "condition": req.body.condition,
                "color": req.body.color,
                "year": req.body.year,
                "quantity": req.body.quantity,
                "__v": 0
            }
        ], {
            headers: {
                Authorization: "Basic " +  process.env.AUTH_DATA,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                res.json(savedTrailer);
            })
            .catch((error) => {
                res.json(error);
            });
    } catch (err) {
        res.json({ message: err });
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const removedTrailer = await Trailer.deleteOne({ _id: req.params.id })
        res.json(removedTrailer);
    } catch (err) {
        res.json({ message: err });
    };
});

router.put('/:id', async (req, res) => {
    try {
        const updatePost = await Trailer.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    manufacturer: req.body.manufacturer,
                    price: req.body.price,
                    model: req.body.model,
                    capacity: req.body.capacity,
                    dimension: req.body.dimension,
                    condition: req.body.condition,
                    color: req.body.color,
                    year: req.body.year,
                    quantity: req.body.quantity
                    //image: req.body.image
                }
            }
        );
        axios.post('https://dev91990.service-now.com/api/440171/incoming_trailer', [
            {
                "image": {
                    "contentType": "image/jpeg"
                },
                "_id": savedTrailer._id,
                "title": req.body.title,
                "manufacturer": req.body.manufacturer,
                "price": req.body.price,
                "model": req.body.model,
                "capacity": req.body.capacity,
                "dimension": req.body.dimension,
                "condition": req.body.condition,
                "color": req.body.color,
                "year": req.body.year,
                "quantity": req.body.quantity,
                "__v": 0
            }
        ], {
            headers: {
                Authorization: "Basic " +  process.env.AUTH_DATA,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                res.json(updatePost);
            })
            .catch((error) => {
                res.json(error);
            });
    } catch (err) {
        res.json({ message: err });
    };
});

module.exports = router;