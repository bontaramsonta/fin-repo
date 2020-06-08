const Admins = require('../api/models/admins');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function adminLogin(req,res,next)
{
  Admins.findOne({email:req.body.email})
  .exec()
  .then(admin =>{
    if(admin==null)
    {
      return res.status(401).json({msg:"Auth failed"});
    }
    bcrypt.compare(req.body.password,admin.password,(err,result)=>{
      if(err || result==false)
      {
        return res.status(401).json({msg:"Auth failed"});
      }
      const token = jwt.sign({
        email:admin.email,
        _id:admin._id
      },process.env.JWT_KEY,{
        expiresIn:"1h"
      })
      return res.status(200).json({
        msg:"Auth successful",
        token
      });
    });
  })
  .catch(err=>{
    next(err);
  });
}

module.exports = adminLogin;