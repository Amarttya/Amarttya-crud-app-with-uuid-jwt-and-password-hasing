const express = require("express");
//const mysql = require('mysql');
require('dotenv').config();
const mysqlconnection = require("./db/dbConnect");
const port = process.env.PORT || '3000' ;
const router = require('./routes/routing');
var app = express();
//const bodyparser = require("body-parser");
app.use(express.json())
const validation = require('./utils/validationmiddleware');
const uservalidation = require('./utils/validation');




mysqlconnection.connect((err) => {
    if (!err) {
      console.log("Connection established");
    } else {
      console.log(
        "DB connection failed \n Error :" + JSON.stringify(err, undefined, 2)
      );
    }
  });

  app.post('/regisration' ,validation(uservalidation) , router);
  app.post('/login' , router);
  app.get('/checking' , router);
  app.get('/profile/:token' , router);

app.listen(port, () => console.log(`Express server is running on port : ${port}`));