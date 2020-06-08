const Schemes = require('../api/models/schemes');

function getAllSchemes(req,res,next)
{
  Schemes.find()
  .select('name bname min_dur max_dur min_amt max_amt interest agerist url flags')
  .exec()
  .then(docs =>{
    let response = {
      count: docs.length,
      schemes: docs.map(doc=>{
        return {
          id: doc._id,
          name: doc.name,
          bname: doc.bname,
          min_amt: doc.min_amt,
          max_amt: doc.max_amt,
          min_dur: doc.min_dur,
          max_dur: doc.max_dur,
          interest: doc.interest,
          agerist: doc.agerist,
          url: doc.url,
          flags: doc.flags,
          additional:{
            type:"GET",
            url: process.env.API_URL+":"+process.env.PORT_NO+"/api/schemes"+'/'+doc._id
          }
        }
      })
    }
    res.status(200).json({"msg":"all record fetched successfully",response});
  }).catch(err=>{
    console.log(err);
    res.status(500);
    next(err);
  })
}

module.exports = getAllSchemes;