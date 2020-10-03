const getBeszallitoMW = require('../middleware/beszallito/getBeszallitoMW');
const getBeszallitokMW = require('../middleware/beszallito/getBeszallitokMW');
const saveBeszallitoMW = require('../middleware/beszallito/saveBeszallitoMW');
const delBeszallitoMW = require('../middleware/beszallito/delBeszallitoMW');

const authMW = require('../middleware/auth/authMW');
const renderMW = require('../middleware/render/renderMW');

const TermekModel = require('../models/termek');
const BeszallitoModel = require('../models/beszallito');

module.exports = function(app) {
    const objRepository = {
        TermekModel: TermekModel,
        BeszallitoModel: BeszallitoModel
    };
    // Beszallitok lista megjelenitese
    app.use(
        '/beszallitok',
        authMW(objRepository),
        getBeszallitokMW(objRepository),
        renderMW(objRepository,'beszallitolista')
    );
    // Egy adott :beszallitoid szerkesztese
    app.use(
        '/beszallito/edit/:beszallitoid',
        authMW(objRepository),
        getBeszallitoMW(objRepository),
        saveBeszallitoMW(objRepository),
        renderMW(objRepository,'beszallitoszerkesztes')
    );
    // Egy adott :beszallitoid torlese
    app.get(
        '/beszallito/del/:beszallitoid',
        authMW(objRepository),
        getBeszallitoMW(objRepository),
        delBeszallitoMW(objRepository)
    );
    // Uj beszallito letrehozasa
    app.use(
        '/beszallito/new',
        authMW(objRepository),
        saveBeszallitoMW(objRepository),
        renderMW(objRepository,'beszallitoletrehozas')
    );
}