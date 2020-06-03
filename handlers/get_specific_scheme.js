const Schemes = require('../models/schemes');

function getSpecificScheme(req,res,next)
{
  Schemes.findById(req.params.paramId,(err,data)=>{
    if(!err){
      let response = {
        id:data._id,
        name:data.name,
        bname:data.bname,
        min_amt:data.min_amt,
        max_amt:data.max_amt,
        min_dur:data.min_dur,
        max_dur:data.max_dur,
        interest:data.interest,
        agerist:data.agerist,
        url:data.url,
        flags:data.flags,
        additional:{
          type:"GET",
          url: process.env.API_URL+":"+process.env.PORT_NO+'/'+'schemes/'
        }
      }
      res.status(200).json({"msg":"scheme of given id fetched",response});
    }else{
      next(err);
    }
  }); 
}

module.exports = getSpecificScheme;