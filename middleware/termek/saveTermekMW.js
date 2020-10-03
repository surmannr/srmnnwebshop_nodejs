/**
 *  Ez a middleware az adatbazishoz egy uj termeket ad hozza VAGY
 *  ha szerepel az adatbazisban akkor frissiti az adatokat.
 *  Sikeres mentes soran a /termekek oldalra iranyit.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const TermekModel = requireOption(objectrepository,'TermekModel')

    return function (req, res, next) {
        if(
            (typeof req.body.nev === 'undefined') ||
            (typeof req.body.kat === 'undefined') ||
            (typeof req.body.ar === 'undefined') ||
            (typeof req.body.besz === 'undefined')
        ) {
            return next()
        }

        if (typeof res.locals.termek === 'undefined') {
            res.locals.termek = new TermekModel();
        }

        res.locals.termek.tnev = req.body.nev;
        res.locals.termek.kategoria = req.body.kat;
        res.locals.termek.kozzeteve = (typeof req.body.koz === 'undefined') ? 'n' : 'i';
        res.locals.termek.besz_ar = req.body.ar;
        res.locals.termek.besz_neve = req.body.besz;

        res.locals.beszallitok.forEach(function (beszallito){
            if(beszallito.bnev === req.body.besz) {
                res.locals.termek._beszallito = beszallito._id;
                let beszallitoar = parseInt(req.body.ar);
                res.locals.termek.ar = Math.round(beszallitoar * beszallito.szorzo / 1000)*1000 - 10;
            }
        });

        res.locals.termek.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/termekek');
        });
    };

};