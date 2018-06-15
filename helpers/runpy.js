const spawn = require('child_process').spawn;
// let runPy  = new Promise((dat, djString) => {
//     const pythonProcess = spawn('python',['../python/elsp.py', dat.p, dat.q, dat.hcost, dat.NT, dat.sInit, djString]);
//     pythonProcess.stdout.on('data', function (data){
//         resolve(data);
//     });
// });
let runPy = function(){
    const pythonProcess = spawn('python', ["../python/sum.py"]);
    pythonProcess.stdout.on('data', function (data) {
    console.log(data);
});
}

module.exports = runPy;