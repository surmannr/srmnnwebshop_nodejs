const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Beszallito = db.model('Beszallito', {
    bnev: String,
    cim: String,
    szorzo: Number,
});

module.exports = Beszallito;