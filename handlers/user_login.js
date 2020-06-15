const Users = require('../api/models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function userLogin(req,res,next)
{
  Users.findOne({email:req.body.email})
  .exec()
  .then(user =>{
    if(user==null)
    {
      return res.status(401).json({msg:"Auth failed"});
    }
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
      if(err || result==false)
      {
        return res.status(401).json({msg:"Auth failed"});
      }
      const token = jwt.sign({
        _id:user._id,
        type:"user",
        email:user.email
      },process.env.JWT_KEY,{
        expiresIn:"14d"
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

module.exports = userLogin;