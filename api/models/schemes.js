const mongoose = require('mongoose');

const schemesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type:String, required:true, unique:true},
  bname: {type:String, required:true},
  min_dur: { type: Array, default: [0,0,0] },
  max_dur: { type: Array, default: [0,0,0] },
  min_amt: { type: Number, default: 0},
  max_amt: { type: Number, default: 0},
  interest: {type: Number, required:true},
  age_rist: { type:Array, default:[0,0,0]},
  url: { type: String, required:true, unique:true},
  flags: { type: Object, default:{}}
});

module.exports = mongoose.model('Schemes',schemesSchema);