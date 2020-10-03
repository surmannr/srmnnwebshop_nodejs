const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Termek = db.model('Termek', {
    tnev: String,
    kategoria: String,
    ar: Number,
    besz_ar: Number,
    kozzeteve: String,
    besz_neve: String,
    _beszallito: {
        type: Schema.Types.ObjectID,
        ref: 'Beszallito'
    }
});

module.exports = Termek;