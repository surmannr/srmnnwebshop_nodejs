/**
 *  A kapott :beszallitoid alapjan kitorli az adatbazisbol a beszallitot.
 *  Torles utan a /beszallitok oldalra iranyit.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    return function(req, res, next) {
        if (typeof res.locals.beszallito === 'undefined') {
            return next();
        }

        res.locals.beszallito.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/beszallitok');
        });
    };
};