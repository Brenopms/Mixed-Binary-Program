const express = require('express');
const spawn  = require('child_process').spawn;
const pythonShell = require('python-shell');
const mid = require('../middleware/index');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title:'home'});
});


router.post('/', mid.processData, (req, res) => {
    // res.render('results', {data: req.formatedData[0], objectiveFunction: req.formatedData[1]});
    res.redirect(`results/${req.id}`);
});

module.exports = router;