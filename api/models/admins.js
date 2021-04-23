const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type:String,
    required:true,
    unique:true,
    match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  phone: { type: String, unique:true  },
  password: {type:String, required:true}
});

module.exports = mongoose.model('Admins',adminSchema);