const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type:String, required:true, unique:true },
  email: {
    type:String,
    required:true,
    unique:true,
    match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password:{ type:String, required:true},
  details:{ type:Object, default:{}},
  activeschemes:{ type:Array, default:[]}
});

module.exports = mongoose.model('Users',usersSchema);