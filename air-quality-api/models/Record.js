const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  datetime: { type: Date },
  co: { type: Number },
  nmhc: { type: Number },
  benzene: { type: Number },
  nox: { type: Number },
  no2: { type: Number },
  sensors: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model('Record', recordSchema);
