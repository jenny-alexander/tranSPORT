const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  console.log(`in GET comments router!`)
  const getCommentsQuery = `SELECT * FROM comment where ride_id = ${req.params.id};`;

  console.log(`query to get comments is:`, getCommentsQuery);
  pool.query(getCommentsQuery)
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
  const insertCommentsQuery = `INSERT INTO comment (ride_id, user_id, text)
                      VALUES ($1,$2,$3);`;
  const values = [req.body.rideID, req.body.creatorID, req.body.comment];

  pool.query(insertCommentsQuery, values)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`error with comment POST`, error);
      res.sendStatus(500);
    })
});

module.exports = router;
