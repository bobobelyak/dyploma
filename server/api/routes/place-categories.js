const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const PlaceCategories = require('../models/place-categories');

router.get('/', (req, res, next) => {
    PlaceCategories.find().exec()
        .then(result => {
            res.status(200).json({
                categories: result,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res, next) => {
    const placeCategory = new PlaceCategories({
        _id: new mongoose.Types.ObjectId(),
        value: req.body.value,
        icon: req.body.icon,
    });
    placeCategory.save()
        .then(result => {
            res.status(200).json({
                category: result,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
