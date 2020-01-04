const express = require('express');

const router = express.Router();
const fs = require('fs');

const imgPathTest = './images/test.png';

//load user model
const User = require('../models/User');


/*router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    };
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    };
});


router.post('/', async (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password
        //image: req.body.image,
    });



    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.id })
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    };
});

router.put('/:id', async (req, res) => {
    try {
        const updatePost = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password
                }
            }
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    };
});

module.exports = router;