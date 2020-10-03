/**
 *  A :beszallitoid alapjan lekeri az adatbazisbol a beszallitot.
 *  Az eredmenyt a res.locals.beszallito -ba menti a rendszer.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const BeszallitoModel = requireOption(objectrepository,'BeszallitoModel')
    return function (req, res, next) {

        BeszallitoModel.findOne({_id: req.params.beszallitoid}, (err,beszallito)=> {
            if(err || !beszallito){
                return next(err);
            }
            res.locals.beszallito = beszallito;
            return next();
        });
    };

};