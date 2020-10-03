const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ZD0SFY', { useNewUrlParser: true });

module.exports = mongoose;