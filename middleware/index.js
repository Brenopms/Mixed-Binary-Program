const express = require('express');
const router = express.Router();
const spawn  = require('child_process').spawn;
const Problem = require('../models/problem');

/**
 * Calls a python function to find the optimal solution to elsp problem using cplex
 * @param  {object} dat - all the arguments of the elsp problem
 * @param  {[String]} djString - list of forecasts demands
 * return {String} containing the objective function and the optimal solution
 */
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
/**
 * Parses the data coming from python script, to optimal solution and objective function
 * @param  {String} dataString - data coming from python with objective function and optimal solution
 * return {[[String], String]} -  optimal solution persed to an array with 
 * Time Period	
 * Production Batch Size	
 * Production Set-up	
 * End Inventory Level
 * 
 * and String with objective function: 'Objective function : NUMBER'
 */
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
/**
 * Saves to mongodb the problem and solution
 * @param  {object} dat - all the arguments of the elsp problem
 * @param  {[String]} djString  - list of forecasts demands
 * @param  {[String]} solution - list with each 
 * Time Period	
 * Production Batch Size	
 * Production Set-up	
 * End Inventory Level
 * @param  {String} objectiveFunction - 'Objective function : NUMBER'
 * return {String} - id of mongo the mongo object that was created
 */
let createProblem = (dat, djString, solution, objectiveFunction) => {
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
/**
 * Receive data from the elsp form, calls runPy to run python function,
 * calls formatData to format the data from the python script,
 * calls createProblem to save the problem and solution to mongodb
 * call next() to return to the route, saving the id to req object
 * @param  {object} req
 * @param  {object} res
 * @param  {object} next
 */
let processData = (req, res, next) => {
    let dat = req.body.dat;
    let djString  = '';
    let dj = req.body.dj;
    for(d in dj){
        djString += `${dj[d]} `
    }
    runPy(dat, djString)
        .then(dataString => {
            let formatedData = formatData(dataString);
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