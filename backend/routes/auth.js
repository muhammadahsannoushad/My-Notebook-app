const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Route 1: Create a user using: post "/api/auth/".
router.post('/',[
 // username must be an email express validater
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password atleat 8 character').isLength({ min: 8 }),

] , (req, res)=>{ 
      // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
       res.json({error: "please enter a unique email"})})
      
//    const user = User(req.body);
//    user.save()
//     console.log(req.body);
//     res.send(req.body);
})

module.exports = router