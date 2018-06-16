import sys
print(10)
sys.stdout.flush()

# // let runPy = (dat, djString) => {
# //     console.log('oi');
# //     const options = {
# //         mode: 'text',
# //         scriptPath: '/home/brenopms/SI/elsp-server/python',
# //         pythonPath: '/usr/bin/python3',
# //         args: [
# //             'server',
# //             dat.p,
# //             dat.q,
# //             dat.hcost,
# //             dat.NT,
# //             dat.sInit,
# //             djString
# //         ]
# //     }
# //     pythonShell.run('elsp.py', options, (err, data) =>{
# //         let dataString;
# //         dataString += err.toString();
# //         console.log(dataString); 
# //     });
# //     // const pythonProcess = spawn('python', ["../python/sum.py"]);
# //     // pythonProcess.stdout.on('data', function(data) {
# //     //     let data2;
# //     //     data2 += data.toString();
# //     // });
# //     console.log('oi2');
# // }