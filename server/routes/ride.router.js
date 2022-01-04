const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET rides for user logged into app
router.get('/view/my-rides/:id', (req, res) => {
  const getAllQuery = `SELECT r.*, u.parent_name as driver FROM ride as r
                       LEFT JOIN "user" as u 
                       ON u.id = r.driver_id
                       WHERE r.creator_id = ${req.params.id}
                       OR r.driver_id = ${req.params.id}`;
  pool.query(getAllQuery)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log(`GET all error is: `, error);
      res.sendStatus(500);
    })
});

// GET all rides in system
router.get('/', (req, res) => {
  const getAllQuery = `SELECT r.*, u.parent_name as driver FROM ride as r
                       LEFT JOIN "user" as u 
                       ON u.id = r.driver_id`;
  pool.query(getAllQuery)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log(`GET all error is: `, error);
      res.sendStatus(500);
    })
});

// GET Ride by ID
router.get('/:rideID', (req, res) => {
  const getRideByIDQuery = `SELECT r.*, u.parent_name as driver FROM ride as r
                       LEFT JOIN "user" as u 
                       ON u.id = r.driver_id
                       WHERE r.id = ${req.params.rideID}`;
  pool.query(getRideByIDQuery)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log(`GET ride by ID error is: `, error);
      res.sendStatus(500);
    })
});

// POST a new ride
router.post('/create', (req, res) => {
  const insertRideQuery = `INSERT INTO ride (pickup_location, dropoff_location, creator_id,
                                                player_name, event_timestamp, game, return_trip)
                       VALUES ($1,$2,$3,$4,$5,$6,$7)
                       RETURNING "id"`;
  //--->TODO: Add the manipulateDataForDB into a global HELPER class
  let values = [manipulateDataForDB(req.body.ride.pickupLocation),
  manipulateDataForDB(req.body.ride.dropoffLocation),
  manipulateDataForDB(req.body.creatorId),
  manipulateDataForDB(req.body.player),
  manipulateDataForDB(req.body.eventTimestamp),
  manipulateDataForDB(req.body.ride.game),
  manipulateDataForDB(req.body.ride.returnTrip)];

  // CREATE the new ride
  pool.query(insertRideQuery, values)
    .then(result => {
      const newRideId = result.rows[0].id;

      //Now handle the join table user_ride
      const insertUserRideQuery = `INSERT INTO user_ride (user_id, ride_id)
                                 VALUES($1,$2)
                                 RETURNING "ride_id";`;

      pool.query(insertUserRideQuery, [req.body.creatorId, newRideId])
        .then((result) => {
          //send back ride id so comments can be created with it
          res.send({ ride_id: newRideId });
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
  pool.query(updateRideQuery)
    .then((result) => {
      //Now handle the join table user_ride
      const insertUserRideQuery = `INSERT INTO user_ride (user_id, ride_id )
                                   VALUES($1,$2);`;
      pool.query(insertUserRideQuery, [req.body.userID, req.body.rideID])
        .then((result) => {
          res.sendStatus(200);
        }).catch((error) => {
          console.log(`assign ride INSERT into user_ride error is:`, error);
          res.sendStatus(500);
        })
    }).catch((error) => {
      console.log(`UPDATE RIDE with driver error is:`, error);
      res.sendStatus(500);
    })
});

//UPDATE the ride & user_ride tables -> remove driver
//need ride id & user id
router.put('/remove-driver', (req, res) => {
  console.log(`in PUT of remove driver and req.body is:`, req.body);
  let putQueryString = `UPDATE ride SET driver_id = null
                            WHERE id = ${req.body.rideID}`;
  pool.query(putQueryString)
    .then((result) => {
      //now delete corresponding record from user_ride table
      const deleteUserRideQuery = `DELETE FROM user_ride WHERE user_id = ${req.body.userID}
                                                      AND ride_id = ${req.body.rideID};`;
      pool.query(deleteUserRideQuery)
        .then((result) => {
          res.sendStatus(200);
        }).catch((error) => {
          console.log(`remove driver DELETE from user_ride failed. Error is:`, error);
          res.sendStatus(500);
        })
    }).catch((error) => {
      console.log(`REMOVE driver_id from RIDE table failed. Error is:`, error);
      res.sendStatus(500);
    })
})

//DELETE an existing ride. Using inner join to delete any associated comments from Comment table.
router.delete('/delete/:id', (req, res) => {
  const deleteQuery = `DELETE from ride WHERE id = ${req.params.id};`;
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
