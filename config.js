var config = {};
dbSchemas = {}; //global

var mongoose = require('mongoose');
mongoose.connect('mongodb://douglastuiuiu:Doug1987@ds151917.mlab.com:51917/xy-inc');
config.db = mongoose;

config.port = 8080;

module.exports = config;