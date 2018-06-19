const express = require('express');
const spawn  = require('child_process').spawn;
const pythonShell = require('python-shell');
const mid = require('../middleware/index');

const router = express.Router();

//insert data 
router.get('/', (req, res) => {
    res.render('index', {title:'home'});
});

//calls middleware to process the data and redirect to the saved problem
router.post('/', mid.processData, (req, res) => {
    res.redirect(`results/${req.id}`);
});

module.exports = router;