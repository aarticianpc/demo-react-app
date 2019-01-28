const express = require('express');
const router = express.Router();

const User = require('../../models/User');

/**
 * @route GET /api/user/all
 * @description GET all users
 * @access Public
 */
router.get('/all', (req, res) => {
    const errors = {};
  
    User.find()
      .select(['name', 'email', 'avatar'])
      .then(users => {
        if(!users) {
          errors.noprofile = 'There are no users.';
          return res.status(404).json(errors);
        }
        
        res.json(users);
      })
      .catch(err => 
        res.status(400).json({ users: 'There are no users.'}) 
      )
  });

  module.exports = router;