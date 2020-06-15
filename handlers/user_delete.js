const Users = require('../api/models/users.js');

function userDelete(req,res,next)
{
  Users.findByIdAndDelete(req.params.userId,(err,data)=>{
    if(!err)
    {
      if(data!=null)
      {
        res.status(200).json({msg:"user is deleted"});
      }else{
        throw new Error("user does not exist");
      }
    }else{
      next(err);
    }
  });
}

module.exports = userDelete;