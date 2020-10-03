/**
 *  Lekeri az osszes termeket az adatbazisbol.
 *  Az eredmenyt a res.locals.termekek -be menti a rendszer.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const TermekModel = requireOption(objectrepository,'TermekModel')

    return function (req, res, next) {
        TermekModel.find({}, (err,termekek)=> {
            if(err){
                return next(err);
            }
            res.locals.termekek = termekek;
            return next();
        });
    };
};