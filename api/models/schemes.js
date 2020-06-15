const mongoose = require('mongoose');

const schemesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type:String, required:true, unique:true},
  bname: {type:String, required:true},
  url: { type: String, required:true, unique:true},
  interest: {type: Number, required:true},
  min_dur: { type: Number, default: 0},
  max_dur: { type: Number, default: 0},
  min_amt: { type: Number, default: 0},
  max_amt: { type: Number, default: 0},
  min_age: { type: Number, default: 0},
  max_age: { type: Number, default: 0},
  flags: { type: Object, default:{}}
});

module.exports = mongoose.model('Schemes',schemesSchema);