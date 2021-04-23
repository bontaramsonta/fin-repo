const jwt = require('jsonwebtoken');

function checkAuth(req,res,next)
{ 
  try
  {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.userData = decoded;
    console.log(req.userData);
    console.log(req.baseUrl);
    // check token type
    if(req.baseUrl=="/api/schemes")
    {
      if(req.userData.type=="admin")
        next();
      else
        throw new Error("wrong token type, yes");
    }
    else if(req.baseUrl=="/api/user")
    {
      if(req.userData.type=="user")
        next();
      else
        throw new Error("wrong token type");
    }
    // next();
  }catch(err)
  {
    return res.status(401).json({
      msg:"Auth failed"
    });
  }
}

module.exports = checkAuth;