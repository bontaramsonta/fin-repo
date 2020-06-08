const Admins = require('../api/models/admins');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function adminRegister(req,res,next)
{
  // check if user already exists
  Admins.find({$or:[{"email":req.body.email},{"phone":req.body.phone}]})
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
          const admin = new Admins({
            _id : new mongoose.Types.ObjectId(),
            email : req.body.email,
            phone : req.body.phone,
            password : hash
          });
          admin.save().then(result=>{
            console.log(result);
            res.status(201).json({"msg":"contributer created"})
          }).catch(err=>{
            next(err);
          })
        }
      });
    }else{
      throw new Error("contributer already exists");
    }
  })
  .catch(err=>{
    next(err);
  });
}

module.exports = adminRegister;