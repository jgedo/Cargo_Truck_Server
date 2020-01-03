const express = require('express');

const router = express.Router();
const fs = require('fs');

const Trailer = require('../models/Trailer');

const imgPathTest = './images/test.png';

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


// test comment by Raghav
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
        res.json(savedTrailer);
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
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    };
});

module.exports = router;