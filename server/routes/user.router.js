const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//Check that the user's email exists in the team table. This means they are ok
//to use the app as a parent of a player on the team.
router.get('/check-email/:email', (req, res) => {
  const getEmailQuery = `SELECT * FROM team where parent_email = '${req.params.email}';`;
  pool.query(getEmailQuery)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log(`Error with email validation!`, error);
      res.sendStatus(500);
    })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const queryText = `INSERT INTO "user" (username, password, email, parent_name, player_name, phone_number)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

  pool
    .query(queryText, [username, password, req.body.userProfile.email, req.body.userProfile.parentName, req.body.userProfile.playerName,
      req.body.userProfile.phoneNumber])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//Update the user information
router.put('/', (req, res) => {
  console.log(`in PUT of user update and req.body is:`, req.body);
  let putQueryString = `UPDATE "user" SET email = '${manipulateDataForDB(req.body.updatedUser.email)}',
                                   parent_name = '${manipulateDataForDB(req.body.updatedUser.parent_name)}',
                                   player_name = '${manipulateDataForDB(req.body.updatedUser.player_name)}',
                                  phone_number = '${manipulateDataForDB(req.body.updatedUser.phone_number)}'
                            WHERE id = ${req.body.updatedUser.id}`;
  pool
    .query(putQueryString)
    .then((results) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error updating user profile.`, error);
      res.sendStatus(500);
    })
})



//TODO:-->>> PUT this in a global helper class instead (keep it DRY)
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
