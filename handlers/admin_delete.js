const Admins = require('../api/models/admins');

function adminDelete(req,res,next)
{
  Admins.remove({_id:req.params.adminId})
  .exec()
  .then(result=>{
    res.status(200).json({msg:"contributer deleted"});
  }).catch(err=>{
    next(err);
  });
}

module.exports = adminDelete;