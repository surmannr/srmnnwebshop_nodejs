/**
 *  A kapott :termekid alapjan kitorli az adatbazisbol a termeket.
 *  Torles utan a /termekek oldalra iranyit.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    return function(req, res, next) {
        if (typeof res.locals.termek === 'undefined') {
            return next();
        }

        res.locals.termek.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/termekek');
        });
    };
};