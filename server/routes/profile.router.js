const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  console.log('moo')

  const getProfileQuery = `SELECT * FROM user_profile where user_id=${req.params.id};`;
  console.log(`getProfile query is:`, getProfileQuery);
  pool.query(getProfileQuery)
    .then((results) => {
      res.send(results.rows[0])
    }).catch((error) => {
      res.sendStatus(500);
      console.log(`Error getting profile information!`, error);
    })
})

router.post('/profile', (req, res) => {
  console.log(`in /profile about to post a new profile with:`, req.body);

  const createProfileQuery = `INSERT INTO user_profile (parent_name, player_name, email,
                              phone_number, user_id) VALUES($1,$2,$3,$4,$5);`;
  const values =
    [req.body.email, req.body.parentName, req.body.playerName, req.body.phoneNumber, req.body.userId]

  pool.query(createProfileQuery, values)
    .then((results) => {
      res.sendStatus(201);
    }).catch((error) => {
      res.sendStatus(500);
      console.log(`Error adding new profile, contact administrator!`, error);
    })
})


module.exports = router;
