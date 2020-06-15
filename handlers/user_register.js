const Users = require('../api/models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function userRegister(req,res,next)
{
  console.log("register the user");
  Users.find({"name":req.body.name})
  .exec()
  .then(docs=>{
    if(docs.length==0)
    {
      // hash the password
      bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
          throw err;
        }else{
          // create obj 'n store
          const user = new Users({
            _id : new mongoose.Types.ObjectId(),
            name: req.body.name,
            email:req.body.email,
            password : hash,
            details : req.body.details
          });
          user.save().then(result=>{
            console.log(result);
            res.status(201).json({"msg":"user created"})
          }).catch(err=>{
            next(err);
          })
        }
      });
    }else{
      throw new Error("user already exists");
    }
  })
  .catch(err=>{
    next(err);
  });
}

module.exports = userRegister;