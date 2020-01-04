const express = require('express');

const router = express.Router();
const fs = require('fs');

const User = require('../models/User');

const imgPathTest = './images/test.png';

router.post("/", async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    try {
        const loggedUser = await User.findOne({ username: username, password: password });
        if (!loggedUser) {
            res.status(401);
            res.json({ message: "Not Authorized" });
        } else {
            res.status(200);
            res.json(loggedUser);
        }
    } catch (err) {
        res.status(500);
        res.json({ message: err });
    };
});

module.exports = router;

