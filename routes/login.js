const express = require('express');

const router = express.Router();
const fs = require('fs');

const User = require('../models/User');

const imgPathTest = './images/test.png';

router.post("/login", function (res, req) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username, password: password }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (!user) {
            return res.status(404).send();
        }

        return res.status(200).send();
    });
});

module.exports = router;

