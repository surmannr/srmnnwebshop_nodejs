const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.use(session({
    secret: 'blackmagic',
}))

app.use(
    function (req,res,next){
        res.locals.kateglist = [
            "Okosóra", "Okoskarkötő", "Bluetooth fülhallgató", "Bluetooth fejhallgató", "Lámpa"
        ];
        return next();
    }
);

require('./route/termekek')(app);
require('./route/beszallitok')(app);
require('./route/login')(app);

const server = app.listen(3000, function () {
    console.log('On: 3000');
})