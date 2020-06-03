const Schemes = require('../models/schemes');

function addScheme(req,res,next)
{
  Schemes.find({"name":req.body.name})
  .exec()
  .then(docs=>{
    if(docs.length==0)
    {
      const scheme = new Schemes({
        _id : new mongoose.Types.ObjectId(),
        name:req.body.name,
        bname:req.body.bname,
        min_amt:req.body.min_amt,
        max_amt:req.body.max_amt,
        min_dur:req.body.min_dur,
        max_dur:req.body.max_dur,
        interest:req.body.interest,
        agerist:req.body.agerist,
        url:req.body.url,
        flags:req.body.flags
      });
      scheme.save().then((result)=>{
        console.log(result);
      }).catch(err=>{
        console.log(err);
        next(err);
      });
      res.status(201).json({
        msg:"new scheme created",
        scheme
      });
    }else
    {
      throw new Error("record already exists");
    }
  })
  .catch(err=>{
    next(err);
  });
}

module.exports = addScheme;