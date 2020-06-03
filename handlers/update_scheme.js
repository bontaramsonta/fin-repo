const Schemes = require('../models/schemes');

function updateScheme(req,res,next)
{
  Schemes.findByIdAndUpdate(req.params.paramId,req.body,(err,data)=>{
    if(!err && data!=null){
      res.status(200).json({
        "msg":"scheme of given id is updated",
        "old_scheme":data,
        "additional":{
          "type":"GET",
          "url": process.env.API_URL+":"+process.env.PORT_NO+'/'+'schemes/'+data._id
        }
      });
    }else{
      next(err);
    }
  });
}

module.exports = updateScheme;