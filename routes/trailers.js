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
        res.json(trailers.map(trailerToMsg));
        
    } catch (err) {
        res.json({ message: err });
    };
});

router.get('/:id', async (req, res) => {
    try {
        const trailer = await Trailer.findById(req.params.id);
        res.json(trailerToMsg(trailer));
    } catch (err) {
        res.json({ message: err });
    };
});

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
    });

    //The expected incoming content from the request is:
    //    "data:image/png;base64,<very long string>"
    //This part will need to be changed if it's cropped down to the <humongous string> part, which might be better anyways.
    //
    //If we used data from the database instead of forwarding REST data to SN, we'd need to use:
    //    trailer.image.data.toString('base64')

    if (req.body.image) {
        trailer.image.data = Buffer.from(req.body.image.split(',')[1], 'base64');
        trailer.image.contentType = req.body.image.split(',')[0].split('data:')[1];
    } else {
        trailer.image.data = "";
        trailer.image.contentType = "";
    }
    
    try {
        const savedTrailer = await trailer.save();
        axios.post('https://dev86379.service-now.com/api/440171/incoming_trailer', [
            {
                "image": {
                    "data": req.body.image.split(',')[1],
                    "contentType": trailer.image.contentType.split(';')[0],
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
                res.json(trailerToMsg(savedTrailer));
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
        const removedTrailer = await Trailer.deleteOne({ _id: req.params.id });
        res.json(removedTrailer);
    } catch (err) {
        res.json({ message: err });
    };
});

router.put('/:id', async (req, res) => {
    try {
        const trailer = await Trailer.findById(req.params.id);
        let updateBody = {
            title: req.body.title,
            manufacturer: req.body.manufacturer,
            price: req.body.price,
            model: req.body.model,
            capacity: req.body.capacity,
            dimension: req.body.dimension,
            condition: req.body.condition,
            color: req.body.color,
            year: req.body.year,
            quantity: req.body.quantity,
            image: {
                data: trailer.image.data,
                contentType: trailer.image.contentType
            }
        };

        let imageChanged = false;
        if (req.body.image && req.body.image != "") {
            updateBody.image.data = Buffer.from(req.body.image.split(',')[1], 'base64');
            updateBody.image.contentType = req.body.image.split(',')[0].split('data:')[1];
            imageChanged = true;
        }

        const updatePost = await Trailer.updateOne(
            { _id: req.params.id },
            {
                $set: updateBody
            }
        );
        let data;
        if (imageChanged) {
            data = {
                "image": {
                    "data": req.body.image.split(',')[1],
                    "contentType": trailer.image.contentType.split(';')[0],
                },
                "_id": req.params.id,
                "title": updateBody.title,
                "manufacturer": updateBody.manufacturer,
                "price": updateBody.price,
                "model": updateBody.model,
                "capacity": updateBody.capacity,
                "dimension": updateBody.dimension,
                "condition": updateBody.condition,
                "color": updateBody.color,
                "year": updateBody.year,
                "quantity": updateBody.quantity,
                "__v": 0
            }
        } else {
            data = {
                "_id": req.params.id,
                "title": updateBody.title,
                "manufacturer": updateBody.manufacturer,
                "price": updateBody.price,
                "model": updateBody.model,
                "capacity": updateBody.capacity,
                "dimension": updateBody.dimension,
                "condition": updateBody.condition,
                "color": updateBody.color,
                "year": updateBody.year,
                "quantity": updateBody.quantity,
                "__v": 0
            }
        }
        axios.post('https://dev86379.service-now.com/api/440171/incoming_trailer', [data], {
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
        console.log(err);
        res.json({ message: err });
    };
});

module.exports = router;