const express = require('express');
const router = express.Router();

const Users = require('../models/users.model');

router.get('/', (req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newUser = new Users({
        uid : req.body.uid,
        uname : req.body.uname,
        upass : req.body.upass,
        uloggedin : req.body.uloggedin
    });

    newUser.save()
        .then(user => res.json(user))
        .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(user => res.json(user))
        .catch(error => res.status(400).json(error));
});

module.exports = router;