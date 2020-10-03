/**
 *  Ez a middleware az adatbazishoz egy uj beszallitot ad hozza VAGY
 *  ha szerepel az adatbazisban akkor frissiti az adatokat.
 *  Sikeres mentes soran a /beszallitok oldalra iranyit.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const BeszallitoModel = requireOption(objectrepository,'BeszallitoModel')

    return function (req, res, next) {

        if(
            (typeof req.body.nev === 'undefined') ||
            (typeof req.body.cim === 'undefined') ||
            (typeof req.body.szorzo === 'undefined')
        ) {
            return next()
        }
        if (typeof res.locals.beszallito === 'undefined') {
            res.locals.beszallito = new BeszallitoModel();
        }

        res.locals.beszallito.bnev = req.body.nev;
        res.locals.beszallito.cim = req.body.cim;
        res.locals.beszallito.szorzo = req.body.szorzo;

        res.locals.beszallito.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/beszallitok');
        });
    };

};