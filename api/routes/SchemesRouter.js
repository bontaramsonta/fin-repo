const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schemes = require('../models/schemes');

// get All localhost/schemes
router.get('/',(req,res,next)=>{
  Schemes.find()
  .select('name bname min_dur max_dur min_amt max_amt interest agerist url flags')
  .exec()
  .then(docs =>{
    let response = {
      count: docs.length,
      schemes: docs.map(doc=>{
        return {
          id:doc._id,
          name:doc.name,
          bname:doc.bname,
          min_amt:doc.min_amt,
          max_amt:doc.max_amt,
          min_dur:doc.min_dur,
          max_dur:doc.max_dur,
          interest:doc.interest,
          agerist:doc.agerist,
          url:doc.url,
          flags:doc.flags,
          request:{
            type:"GET",
            url: process.env.API_URL+":"+process.env.PORT_NO+"/schemes"+'/'+doc._id
          }
        }
      })
    }
    res.status(200).json(response);
  }).catch(err=>{
    console.log(err);
    res.status(500);
    next(err);
  })
});

// get scheme by _id
router.get('/:paramId',(req,res,next)=>{
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
          request:{
            type:"GET",
            url: process.env.API_URL+":"+process.env.PORT_NO+'/'+'schemes/'
          }

      }
      res.status(200).json({"msg":"scheme of given id fetched","scheme":response});
    }else{
      next(err);
    }
  });
})

// update scheme
router.patch('/:paramId',(req,res,next)=>{
  Schemes.findByIdAndUpdate(req.params.paramId,req.body,(err,data)=>{
    if(!err){
      res.status(200).json({"msg":"scheme of given id is updated","old_scheme":data});
    }else{
      next(err);
    }
  });
});

// delete scheme
router.delete('/:paramId',(req,res,next)=>{
  Schemes.findByIdAndRemove(req.params.paramId,(err,data)=>{
    if(!err){
      res.status(200).json({"msg":"scheme of given id deleted","old_scheme":data});
    }else{
      next(err);
    }
  });
});

// add new scheme
router.post('/',(req,res,next)=>{
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
  });
  res.status(201).json({
    msg:"new scheme created",
    scheme
  });
});

module.exports = router;