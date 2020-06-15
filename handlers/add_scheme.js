const Schemes = require('../api/models/schemes');
const mongoose = require('mongoose');

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
        interest:req.body.interest,
        min_amt:req.body.min_amt,
        max_amt:req.body.max_amt,
        min_dur:req.body.min_dur,
        max_dur:req.body.max_dur,
        min_age:req.body.min_age,
        max_age:req.body.max_age,
        url:req.body.url,
        flags:req.body.flags
      });
      scheme.save().then((result)=>{
        console.log(result);
        res.status(201).json({
          "msg":"new scheme created",
          "scheme":result
        });
      }).catch(err=>{
        next(err);
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