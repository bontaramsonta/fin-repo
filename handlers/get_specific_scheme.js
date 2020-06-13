const Schemes = require('../api/models/schemes');

function getSpecificScheme(req,res,next)
{
  Schemes.findById(req.params.paramId,(err,data)=>{
    if(!err){
      let response = {
        id:data._id,
        name:data.name,
        bname:data.bname,
        interest:data.interest,
        min_amt:data.min_amt,
        max_amt:data.max_amt,
        min_dur:data.min_dur,
        max_dur:data.max_dur,
        min_age:data.min_age,
        max_age:data.max_age,
        url:data.url,
        flags:data.flags,
        additional:{
          type:"GET",
          url: process.env.API_URL+":"+process.env.PORT_NO+'/'+'api/schemes'
        }
      }
      res.status(200).json({"msg":"scheme of given id fetched",response});
    }else{
      next(err);
    }
  }); 
}

module.exports = getSpecificScheme;