const mongoose = require('mongoose');

//Mongoose model for problem and solution of ESLP
let problemSchema = new mongoose.Schema({
    dat: {
        file: {
            type: String,
            default: 'server',
        },
        p: {
            type: String,
            required: true
        },
        q: {
            type: String,
            required: true
        },
        hcost: {
            type: String,
            required: true
        },
        NT: {
            type: String,
            required: true
        },
        sInit: {
            type: String,
            required: true
        }
    },
    djString: {
        type: String,
        required: true
    },
    solution: {
        type: [String],
        required: true
    },
    objectiveFunction: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Problem', problemSchema);