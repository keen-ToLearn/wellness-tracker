const express = require('express');
const router = express.Router();

const Records = require('../models/records.model');

router.get('/', (req, res) => {
    Records.find()
        .then(records => res.json(records))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newRecord = new Records({
        uid : req.body.uid,
        rdate : req.body.rdate,
        rfever : req.body.rfever,
        rcold : req.body.rcold,
        rcough : req.body.rcough,
        rheight : req.body.rheight,
        rweight : req.body.rweight,
        rother : req.body.rother
    });

    newRecord.save()
        .then(record => res.json(record))
        .catch(error => res.status(400).json(error));
});

module.exports = router;