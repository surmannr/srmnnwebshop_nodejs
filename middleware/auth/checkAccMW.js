/**
 *  Ha a beirt felhasznalonev es jelszo megtalalhato a rendszerben, akkor:
 *      - tovabbvisz a welcome.ejs oldalra.
 *  Egyebkent pedig visszavisz az index.ejs/?hiba=ismeretlenfelhasznalo
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        if( (typeof req.body.password === 'undefined') || (typeof req.body.username === 'undefined' )){
            return next();
        }

        if ((req.body.password === 'admin') && (req.body.username === 'admin' )){
            req.session.belepve = true;
            return req.session.save((err)=>{
                res.redirect('/ecadmin');
            })
        }

        res.locals.error = 'Hibás felhasználónév / jelszó!';
        return next();
    };

};