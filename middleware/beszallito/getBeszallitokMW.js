/**
 *  A beszallitokat lekerjuk az adatbazisbol.
 *  Az eredmenyt a res.locals.beszallitok -ba menti a rendszer.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const BeszallitoModel = requireOption(objectrepository,'BeszallitoModel')

    return function (req, res, next) {
        BeszallitoModel.find({}, (err,beszallitok)=> {
            if(err){
                return next(err);
            }
            res.locals.beszallitok = beszallitok;
            return next();
        });
    };
};