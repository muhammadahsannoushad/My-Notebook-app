const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Ahmed is a good boy';

// Route 1: Create a user using: post "/api/auth/createuser".
router.post('/createuser', [
  // username must be an email express validater
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password atleat 8 character').isLength({ min: 8 }),

], async (req, res) => {
  let success = false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  // if there are errors, return Bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  // check whether the user with email exists already
   try { 
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({success, errors: "sorry a user with this email already exists" })
  }
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(req.body.password, salt);

  // Create a new users
  user = await User.create({
    name: req.body.name,
    password: secpass,
    email: req.body.email,
  });
  // jwt code 
  const data = {
    user:{
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
   console.log(authtoken);

  // res.json(user)
  success = true;
  res.json({success, authtoken})

} catch (error) {
   console.error(error.messege);
   res.status(500).send("some Error occured");
}

  // .then(user => res.json(user))
  // .catch(err=> {console.log(err)
  //    res.json({error: "please enter a unique email"})})

  //    const user = User(req.body);
  //    user.save()
  //     console.log(req.body);
  //     res.send(req.body);
});

  // Route 2 login: Create a user using: post "/api/auth/login".
  router.post('/login', [
    // username must be an email express validater
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password atleat 8 character').exists(),
  
  ], async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // if there are errors, return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }      
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user) {
        success = false;
        return res.status(400).json({error: "please try to login with correct credentials"});
      }

     const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success = false;
        return res.status(400).json({success, error: "please try to login with correct credentials"});
      }
    
    const data = {
     user:{
      id: user.id
    }
  }
   const authtoken = jwt.sign(data, JWT_SECRET);
   success = true;
   res.json({success, authtoken})
   
    } catch (error) {
      console.error(error.messege);
      res.status(500).send("some Error occured");
   }
  });

  // Route 3: Get loggedin user Detail using: post "/api/auth/getuser". login required
  router.post('/getuser', fetchuser,  async(req, res)=> {
   
  try {
    userId = req.user.id;;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.messege);
    res.status(500).send("some Error occured");
 }
})


module.exports = router