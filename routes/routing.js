const express = require("express");

const router = express.Router();

const mysqlconnection = require("../db/dbConnect");

const { v4: uuidv4 } = require("uuid");
uuidv4();

const bcrypt = require("bcrypt");

const authService = require('../utils/jwt');


router.post("/regisration", async (req, res) => {
  try {
    //const fName = req.body.fname;
    // const lName = req.body.lname;
    // const address = req.body.address;
    // const email = req.body.email;
    // const password = req.body.password;
    // const user_id = req.body.user_id;
    //const id = req.params.user_id;
    const { fname, lname, address, email, password, user_id } = req.body;
    const id = uuidv4(user_id);

    const hash = await bcrypt.hash(password, 5, function (err, hash) {
      if (err) {
        res.send("error in bcrypting");
      } else {
        //console.log(hash);
        //return hash;
        mysqlconnection.query(
          "INSERT INTO registration (fname ,lName, address , email , password, user_id) VALUES (?,?,?,?,?,?)",
          [fname, lname, address, email, hash, id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send("User Registered");
            }
          }
        );
      }
    });

    // mysqlconnection.query(
    //   "INSERT INTO registration (fname ,lName, address , email , password, user_id) VALUES (?,?,?,?,?,?)",
    //   [fname, lname, address, email, hash, id],
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       res.status(200).send("value Inserted");
    //     }
    //   }
    // );
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res , next) => {
  const { email, password } = req.body;

  const comparingPassword = async(inputpassword,dbPassword,obj)=>{
    const inputpassword_ = inputpassword.toString();
    const dbPassword_ = dbPassword.toString();
    let passwordMatch = bcrypt.compareSync(inputpassword_, dbPassword_)
      if(!passwordMatch){
        res.send("password is  invalid");
      }else{
        const aecessToken = await authService.generateToken(obj);
        res.status(200).send("logged in and the aecess token is: " + aecessToken);
        //return next();
      }
  }
  
  // const data = () => {
    mysqlconnection.query("SELECT * FROM registration WHERE email = ?",
      [email],
      (err, result) => {
        if (result.length == 0) {
          //console.log(err);
          res.send("email don't exist");
        } else {
          //res.status(200).send(result);
          //console.log(result);
          comparingPassword(password , result[0].password, result)
          //res.send(authService.generateToken(result));

        }
      });
  ;
});

router.get("/checking", (req, res) => {
  res.send("checking");
});

router.get("/profile/:token" , async (req,res)=>{
  if (!req.params.token) {
    return res.status(400).json(errorResponse('Token is required', 400))
  }
  try{
  const token = req.params.token;

  const tokeninfo =await authService.verifyToken(token);

  if(!tokeninfo){
    res.send("Invalid token")
  }else{
    res.send("your profile")
  } 
}catch(err){
  console.log(err)
}
})

module.exports = router;
