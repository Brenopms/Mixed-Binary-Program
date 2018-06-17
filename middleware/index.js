const express = require('express');
const router = express.Router();
const spawn  = require('child_process').spawn;
const Problem = require('../models/problem');


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
    objectiveFunction = formatedData.splice(0,4).join(' ');
    formatedData = [formatedData, objectiveFunction]
    return formatedData;
}

const createProblem = (dat, djString, solution, objectiveFunction) => {
    return new Promise((resolve, reject) => {
            const data = {
                dat: {
                    file: 'server',
                    p: dat.p,
                    q: dat.q,
                    hcost: dat.hcost,
                    NT: dat.NT,
                    sInit: dat.sInit
                },
                djString: djString,
                solution: solution,
                objectiveFunction: objectiveFunction
            }
            console.log(data);
            const problem = new Problem(data)
            problem.save()
                .then(result => resolve(result._id))
                .catch(err => reject(err));
    })
}

let processData = (req, res, next) => {
    let dat = req.body.dat;
    let djString  = '';
    let dj = req.body.dj;
    for(d in dj){
        djString += `${dj[d]} `
    }
    console.log(dat);
    runPy(dat, djString)
        .then(dataString => {
            let formatedData = formatData(dataString);
            // console.log(formatedData);
            // req.formatedData = formatedData;
            createProblem(dat, djString, formatedData[0], formatedData[1])
                .then(id => {
                    req.id = id;
                    next()
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/');
                })
        })
        .catch(err => res.redirect('/'));
}

module.exports = {
    processData,
    runPy,
    formatData
}