const express = require('express');
const router = express.Router();
const mid = require('../middleware/index');
const Problem = require('../models/problem');


router.get('/', (req, res) => {
    Problem.find({}).exec()
        .then(results => {
            console.log(results);
            res.render('results2', {results: results});
        })
        .catch(err => {
            console.log(err);
            res.render('index');
        })
});

router.get('/:id', (req, res) => {
    Problem.findById(req.params.id)
        .then(result => {
            console.log(result);
            res.render('result_id', {result: result});
        })
        .catch(err => {
            console.log(err);
            res.render('index');
        });
})


module.exports = router;
