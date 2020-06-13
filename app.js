const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const schemesRouter = require('./api/routes/SchemesRouter');
const adminRouter = require('./api/routes/AdminRouter');
const usersRouter = require('./api/routes/usersRouter');
const app = express();

// db connect
mongoose.connect(/*mongodb+srv://sourav:"
  +process.env.MONGO_ATLAS_PW+
  "@fin-db-cmksi.mongodb.net/test?retryWrites=true&w=majority"*/
  "mongodb://localhost:5000/test",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


// Middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
// set response header and cors
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
  if(req.method=="OPTIONS"){
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH");
    return res.status(200).json({});
  }
});

// function routes
app.use('/api/schemes',schemesRouter);
app.use('/api/admin',adminRouter);
app.use('/api/user',usersRouter);

// 404 route
app.use((req,res,next)=>{
  const error = new Error("Not a valid request");
  error.status = 404;
  next(error);
});

// Error handler
app.use((err,req,res,next)=>{
  res.status(err.status || 500).json({"Error":err.message});
})

// export
module.exports = app;