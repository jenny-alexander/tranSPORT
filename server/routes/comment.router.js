const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const selectQuery = `SELECT * FROM comment where ride_id = ${req.params.id};`;

  pool.query(selectQuery)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log(`GET comments error is:`, error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log(`req.body for POST comment is:`, req.body);
  const insertQuery = `INSERT INTO comment (ride_id, user_id, text)
                      VALUES ($1,$2,$3);`;
  const values = [req.body.rideID, req.body.creatorID, req.body.comment];

  pool.query(insertQuery, values)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`error with comment POST`, error);
      res.sendStatus(500);
    })
});

module.exports = router;
