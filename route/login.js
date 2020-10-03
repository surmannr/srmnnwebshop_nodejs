const renderMW = require('../middleware/render/renderMW');
const logoutMW = require('../middleware/auth/logoutMW');
const checkAccMW = require('../middleware/auth/checkAccMW');
const authMW = require('../middleware/auth/authMW');

const TermekModel = require('../models/termek');
const BeszallitoModel = require('../models/beszallito');

module.exports = function(app) {
    const objRepository = {
        TermekModel: TermekModel,
        BeszallitoModel: BeszallitoModel
    };
    // Udvozlooldal megjelenitese
    app.use(
        '/ecadmin',
        authMW(objRepository),
        renderMW(objRepository,'welcome')
    );
    // Kijelentkezes a felhasznalobol
    app.use(
        '/logout',
        logoutMW(objRepository)
    );
    // Fooldal megjelenitese, felhasznalo ellenorzesevel
    app.use(
        '/',
        checkAccMW(objRepository),
        renderMW(objRepository,'index')
    );
}