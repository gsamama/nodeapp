const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/users');
const config = require('../config');

const router = express.Router();

const hashkey = config.HASHKEY;
const expiresIn = config.EXPIRESIN;

// Auxiliary function(for login session purposes)
const createUserToken = userId=>{
  //jwt.sign({userid}, {HashKey}, {options})
  return jwt.sign({id: userId}, hashkey, {expiresIn: expiresIn});
}

// endPoints::Start
router.get('/', (req, res)=>{
  // ok we know by default its 200 but its nice to keep habbits for status codes
  return send.status(200).send({response: 'this is the index page, place to add main html page'});
})

// I Could create a second file for it, its just for quick use
// Creating user
router.post('/create', async (req, res) => {
  const {Name, Password, Age, City} = req.body;
  if(!Name || !Password || !Age || !City) return res.status(400).send({error: 'Missing data'});  
  try{
    if(await User.findOne({Name, Age, City})) return res.status(401).send({error: 'Existing user'});
    const user = await User.create({Name, Password, Age, City});
    user.password = undefined;
    return res.status(201).send({user, token: createUserToken(user.id)});
  }
  catch(err){
    console.log(err);
    return res.status(500).send({error: 'Internal Server Error(500)'});
  }
});
// Logging in
router.post('/auth', async (req, res)=>{
  const {Name, Password} = req.body;
  
  try{
    const user = await User.findOne({Name}).select('+Password');
    if(!user) return res.status(401).send({response: 'USER NOT FOUND: cant log in'});

    const passOK = await bcrypt.compare(Password, user.Password);
    if(!passOK) return res.status(401).send({response: 'PASSWORD MISSMATCH: cant log in'});
    
    return res.send({user, token: createUserToken(user.id)});
  }
  catch(err){
    console.log(err);
    return res.status(500).send({error: 'AUTH:ERROR '});
  }
});

module.exports = router;