const Schemes = require('../api/models/schemes');

function deleteScheme(req,res,next)
{
  Schemes.findByIdAndRemove(req.params.paramId,(err,data)=>{
    if(!err){
      res.status(200).json({"msg":"scheme of given id deleted","old_scheme":data});
    }else{
      next(err);
    }
  });
}

module.exports = deleteScheme;