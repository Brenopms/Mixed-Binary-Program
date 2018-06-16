const express = require('express');
const spawn  = require('child_process').spawn;
const pythonShell = require('python-shell');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title:'home'});
});


let runPy = (dat, djString) => {
    return new Promise((resolve, reject) => {
        let dataString = '';
        let py = spawn('python3',[
            '/home/brenopms/SI/elsp-server/python/elsp.py',
             'server', 
             dat.p, 
             dat.q, 
             dat.hcost,
             dat.NT, 
             dat.sInit,
             djString
        ]);

        py.stdout.on('data', (data) => {
            dataString += data.toString();
        });
        py.stdout.on('end', () => {
            resolve(dataString);
        });
        py.stderr.on('err', (err) =>{
            reject(err.toString());
        })
    });
} 

let formatData = (dataString) => {
    formatedData = dataString.split('ticks)'); 
    formatedData = formatedData[formatedData.length - 1]; //get the final table
    formatedData = formatedData.replace(/\s\s+/g, ' ').split(/\s/g); //replace more than one space for just one and split
    formatedData.shift(); //pop the first item of array
    formatedData.pop();////pop the last item of array
    console.log(formatedData);
    return formatedData;
}

router.post('/', (req, res) => {
    // let data = runPy.then();
    let dat = req.body.dat;
    let djString  = '';
    let dj = req.body.dj;
    for(d in dj){
        djString += `${dj[d]} `
    }
    // console.log(djString);
    runPy(dat, djString)
        .then(dataString => {
            formatedData = formatData(dataString);
            res.render('/results', {data: formatedData});
        })
        .catch(err => console.log(err));
    res.redirect('/');
});

module.exports = router;