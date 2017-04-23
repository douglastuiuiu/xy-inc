var config = require('../config');
var mongoose = config.db;

var PoiSchema = new mongoose.Schema({
  name: String,
  x: Number,
  y: Number,
  create_at: { type: Date, default: Date.now },
});

dbSchemas.Poi = config.db.model('poi', PoiSchema);