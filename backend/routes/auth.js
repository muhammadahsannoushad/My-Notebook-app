const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Route 1: Create a user using: post "/api/auth/createuser".
router.post('/createuser', [
  // username must be an email express validater
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password atleat 8 character').isLength({ min: 8 }),

], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  // if there are errors, return Bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check whether the user with email exists already
   try { 
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ errors: "sorry a user with this email already exists" })
  }
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(req.body.password, salt);

  // Create anew users
  user = await User.create({
    name: req.body.name,
    password: secpass,
    email: req.body.email,
  })
  res.json(user)
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

module.exports = router