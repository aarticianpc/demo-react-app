const express = require('express');
const router = express.Router();

const User = require('../../models/User');


/**
 * @route GET /api/user/all
 * @description GET all users
 * @access Public
 */
router.get('/all/:total_users', (req, res) => {
    const errors = {};
    let total_users = parseInt(req.params.total_users);
    User.find().skip(0).limit(total_users)
      .select(['name', 'email', 'avatar', 'date'])
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

 /**
 * @route GET /api/user/search_by_name
 * @description Search users by name
 * @access Public
 */
router.get('/search_by_name/:search_string', (req, res) => {
    const errors = {}

    User.find().where('name').regex(new RegExp(req.params.search_string, 'i'))
        .select(['name', 'email', 'avatar', 'date'])
        .then(users => {
            if(!users) {
                errors.noprofile = 'There are no users.';
                return res.status(404).json(errors);
            }
            res.json(users);
        })
        .catch(err => 
            res.status(400).json({ users: 'There are no users.' })
        )
});

 /**
 * @route GET /api/user/filter_by_ids
 * @description Search users by ids
 * @access Public
 */
router.post('/filter_by_ids', (req, res) => {
    const errors = {}
    let ids = req.body.ids.split(",");
    User.find().where('_id').in(ids)
        .select(['name', 'email', 'avatar', 'date'])
        .then(users => {
            if(!users) {
                errors.noprofile = 'There are no users.';
                return res.status(404).json(errors);
            }
            res.json(users);
        })
        .catch(err => 
            res.status(400).json({ users: 'There are no users.' })
        )
});

 /**
 * @route GET /api/user/filter_by_date_range
 * @description Search users by date range
 * @access Public
 */
router.post('/filter_by_date_range', (req, res) => {
    const errors = {}
    User.find().where('date').gt(req.body.startDate).lt(req.body.endDate)
        .select(['name', 'email', 'avatar', 'date'])
        .then(users => {
            if(users.length === 0) {
                errors.users = 'There are no users.';
                return res.status(404).json(errors);
            }
            res.json(users);
        })
        .catch(err => 
            res.status(400).json({ users: 'There are no users.' })
        )
});
 
module.exports = router;