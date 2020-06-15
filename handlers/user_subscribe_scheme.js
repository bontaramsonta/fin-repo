const Users = require('../api/models/users.js');

function schemeSubscribe(req,res,next)
{
  Users.findByIdAndUpdate(req.params.userId,{$push:{activeschemes:req.body.schemeId}},(err,data)=>{
    if(!err){
      // extra user auth
      if(req.userData.email==data.email)
      {
        let response = {
          id:data._id,
          name:data.name,
          email:data.email,
          password : data.password,
          details : req.body.details,
          old_activeschemes: data.activeschemes
        }
        res.status(200).json({"msg":"user of given id fetched",response});
      }else
      {
        let error = new Error("Auth failed(wrong token)");
        error.status = 401;
        next(error);
      }
    }else{
      next(err);
    }
  }); 
}
module.exports = schemeSubscribe;