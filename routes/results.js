const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

//renders all problems with links to their solutions
router.get('/', (req, res) => {
    Problem.find({}).exec()
        .then(results => {
            res.render('results', {results: results});
        })
        .catch(err => {
            console.log(err);
            res.render('index');
        });
});

//render the selected problem and its solution
router.get('/:id', (req, res) => {
    Problem.findById(req.params.id)
        .then(result => {
            res.render('result_id', {result: result});
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
});


module.exports = router;
