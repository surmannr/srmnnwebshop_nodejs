const getTermekMW = require('../middleware/termek/getTermekMW');
const getTermekekMW = require('../middleware/termek/getTermekekMW');
const saveTermekMW = require('../middleware/termek/saveTermekMW');
const delTermekMW = require('../middleware/termek/delTermekMW');

const getBeszallitokMW = require('../middleware/beszallito/getBeszallitokMW');

const authMW = require('../middleware/auth/authMW');
const renderMW = require('../middleware/render/renderMW');

const TermekModel = require('../models/termek');
const BeszallitoModel = require('../models/beszallito');

module.exports = function(app) {
    const objRepository = {
        TermekModel: TermekModel,
        BeszallitoModel: BeszallitoModel
    };
    // Termekek lista megjelenitese
    app.use(
        '/termekek',
        authMW(objRepository),
        getBeszallitokMW(objRepository),
        getTermekekMW(objRepository),
        renderMW(objRepository,'termeklista')
    );
    // Egy adott :termekid szerkesztese
    app.use(
        '/termek/edit/:termekid',
        authMW(objRepository),
        getBeszallitokMW(objRepository),
        getTermekMW(objRepository),
        saveTermekMW(objRepository),
        renderMW(objRepository,'termekszerkesztes')
    );
    // Egy adott :termekid torlese
    app.get(
        '/termek/del/:termekid',
        authMW(objRepository),
        getTermekMW(objRepository),
        delTermekMW(objRepository)
    );
    // Uj termek letrehozasa
    app.use(
        '/termek/new',
        authMW(objRepository),
        getBeszallitokMW(objRepository),
        saveTermekMW(objRepository),
        renderMW(objRepository,'termekletrehozas')
    );
}