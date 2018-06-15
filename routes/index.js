const express = require('express');
const runPy = require('../helpers/runpy');
const spawn = require('child_process').spawn;

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title:'home'});
});

// let runPy  = new Promise((dat, dj) => {
//     const pythonProcess = spawn('python',['../python/elsp.py', dat.p, dat.q, dat.hcost, dat.NT, dat.sInit, djString]);
//     pythonProcess.stdout.on('data', function (data){
//         return data;
//     });
// });

router.post('/', (req, res) => {
    // let data = runPy.then();
    let djString  = '';
    let dj = req.body.dj;
    for(d in dj){
        djString += `${dj[d]} `
    }
    runPy();
    console.log(djString);
    res.redirect('/');
});

module.exports = router;