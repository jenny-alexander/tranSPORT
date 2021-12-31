const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET rides for user logged into app
router.get('/view/my-rides/:id', (req, res) => {
  console.log('meow');
  // const getQuery = `SELECT r.*,
  //                  c.parent_name AS creator_name,
  //                  d.parent_name AS driver_name
  //                  FROM ride AS r
  //                  JOIN "user" AS c ON r.creator_id = c.id
  //                  JOIN "user" AS d ON r.driver_id = d.id
  const getQuery = `SELECT *
                   FROM ride
                   WHERE creator_id = ${req.params.id} OR
                   driver_id = ${req.params.id};`

  console.log(`in get rides. query is:`, getQuery)

  pool.query(getQuery)
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      console.log(`GET error is:`, error);
      res.sendStatus(500);
    })
});

// GET all rides in system
router.get('/', (req, res) => {
  console.log(`woof`)
  // const getAllQuery = `SELECT r.*,
  //                  c.parent_name AS creator_name,
  //                  d.parent_name AS driver_name
  //                  FROM ride AS r
  //                  JOIN "user" AS c ON r.creator_id = c.id
  //                  JOIN "user" AS d ON r.driver_id = d.id;`;
  const getAllQuery = `SELECT * FROM ride;`;
  console.log(`get all query is`, getAllQuery);

  pool.query(getAllQuery)
    .then((results) => {
      console.log(`results are:`, results.rows);
      res.send(results.rows)
    }).catch((error) => {
      console.log(`GET all error is: `, error);
      res.sendStatus(500);
    })
});

// POST a new ride
router.post('/create', (req, res) => {
  const insertRideQuery = `INSERT INTO ride (pickup_location, dropoff_location, creator_id,
                                                player_name, event_timestamp, event_type, return_trip)
                       VALUES ($1,$2,$3,$4,$5,$6,$7)
                       RETURNING "id"`;
  //--->TODO: Add the manipulateDataForDB into a global HELPER class
  let values = [manipulateDataForDB(req.body.ride.pickupLocation),
  manipulateDataForDB(req.body.ride.dropoffLocation),
  manipulateDataForDB(req.body.creatorId),
  manipulateDataForDB(req.body.player),
  manipulateDataForDB(req.body.eventTimestamp),
  manipulateDataForDB(req.body.ride.eventType),
  manipulateDataForDB(req.body.ride.returnTrip)];

  // CREATE the new ride
  pool.query(insertRideQuery, values)
    .then(result => {
      //console.log(`new ride id is:`, result.rows[0].id)//new ride is here!

      const newRideId = result.rows[0].id;

      //Now handle the join table user_ride
      const insertUserRideQuery = `INSERT INTO user_ride (user_id, ride_id)
                                 VALUES($1,$2);`;

      pool.query(insertUserRideQuery, [req.body.creatorId, newRideId])
        .then((result) => {
          //send back success
          res.sendStatus(201);
        }).catch(error => {
          console.log(`CREATE ride_user error is:`, error);
          res.sendStatus(500);
        })

    }).catch((error) => {
      console.log(`CREATE ride error is:`, error);
      res.sendStatus(500);
    })

});

//PUT - update an existing ride. 
router.put('/edit-ride/:id', (req, res) => {
  const updateRideQuery = `UPDATE ride SET pickup_date = ${req.body.pickupDate},
                                       pickup_location = ${req.body.pickupLocation},
                                       dropoff_location = ${req.body.dropOffLocation}
                          WHERE id = ${req.params.id};`;

  pool.query(updateRideQuery)
    .then((result) => {
      console.log(`successfully updated the ride updated info`);
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Update ride error is:`, error);
      res.sendStatus(500);
    })

});

//PUT - update an existing ride when a non-creator SIGNS UP to be the driver
//driverId should be passed as id
// NEED TWO PARAMS FROM FRONT_END
router.put('/assign-ride', (req, res) => {
  console.log(`req.body are:`, req.body);
  const updateRideQuery = `UPDATE ride SET driver_id = ${req.body.userID},
                                         ride_status = 'Assigned Driver'
                                            WHERE id = ${req.body.rideID};`;
  console.log(`updateRideQuery is:`, updateRideQuery);

  // pool.query('BEGIN');

  pool.query(updateRideQuery)
    .then((result) => {
      console.log(`successfully updated the ride with driver and status`);

      //Now handle the join table user_ride
      const insertUserRideQuery = `INSERT INTO user_ride (user_id, ride_id )
                                   VALUES($1,$2);`;
      pool.query(insertUserRideQuery, [req.body.userID, req.params.rideID])
        .then((result) => {
          // pool.query('COMMIT');
          console.log(`record successfully created in user_ride after assigned driver`)
          res.sendStatus(200);
        }).catch((error) => {
          // pool.query('ROLLBACK');
          console.log(`assign ride INSERT into user_ride error is:`, error);
          res.sendStatus(500);
        })

    }).catch((error) => {
      console.log(`UPDATE RIDE with driver error is:`, error);
      res.sendStatus(500);
    })
});

//DELETE an existing ride. Using inner join to delete any associated comments from Comment table.
router.delete('/delete/:id', (req, res) => {
  const deleteQuery = `DELETE ride, comment FROM ride
                       INNER JOIN comment ON ride.id = comment.ride_id
                       WHERE ride.id = ${req.params.id}";`;

  pool.query(deleteQuery)
    .then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`delete ride error is:`, error);
      res.sendStatus(500);
    })
});

const replaceApostrophe = (singleApostropheString) => {
  let doubleApostropheString = singleApostropheString.replace(/'/g, "''");
  return doubleApostropheString;
}

const manipulateDataForDB = (requestValue) => {
  if (typeof value == 'string') {
    //Replace single apostrophe with double apostrophe.
    requestValue = replaceApostrophe(requestValue);
    //Put single quotes around string value
    requestValue = "'" + requestValue + "'";
  }
  return requestValue;
}

module.exports = router;
