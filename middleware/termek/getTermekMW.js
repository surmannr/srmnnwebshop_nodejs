/**
 *  A kapott :termekid alapjan lekeri az adott termeket az adatbazisbol.
 *  Az eredmenyt a res.locals.termek -be menti a rendszer.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TermekModel = requireOption(objectrepository,'TermekModel')
    return function (req, res, next) {

        TermekModel.findOne({_id: req.params.termekid}, (err,termek)=> {
            if(err || !termek){
                return next(err);
            }
            res.locals.termek = termek;
            return next();
        });
    };

};