/**
 *  Ha a felhasznalo nincsen belepve, akkor: index.ejs-re iranyit
 *  Egyebkent pedig tovabb lep a valasztott oldalra.
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof req.session.belepve=='undefined' && req.session.belepve !== true) {
            return res.redirect('/');
        }
        return next();
    };

};