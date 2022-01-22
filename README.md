# *tran*SPORT

<img src="./public/images/logo_original.png" align="center"
     alt="Size Limit logo by Anton Lovchikov" width="125" height="125">

## Description

* tranSPORT is an application that simplifies the way caregivers share carpooling duties. Specifically, sports-centered carpooling duties.
* Currently, caregivers send carpool requests through various apps like Google chat, iMessage, GroupMe and email. These applications are already used for various things that it can be difficult to know when an important request is made - like a ride request! 
* Using tranSPORT as the go-to application for sports carpooling families means that caregivers can easily access ride sharing information in one central location.

As a project goal, the fullstack application should demonstrate the CRUD principles in actions.

* **C:** Create a new ride request and submit data to the database.
* **R:** Get all of the existing rides from the database and display as a list to the user.
* **U:** Update ride request with details such as "assign driver", "withdraw driver", and "add comments".
* **D:** Delete a ride request.
*All of the CRUD actions take place against a PostgreSQL database.*

**UI:** The application was styled using Material UI components.

## *tran*SPORT application demo

(Coming soon!)
<!-- ![*tranSPORT* application](/public/images/redux-feedback-form.gif) -->

## Installation

In order to get the application up and running, do the following:

1. Download code locally from GitHub (fork & clone).

2. Open a terminal from the project location and type 'npm install'. This will install all of the necessary dependencies that the app needs to function properly.
3. Create the database and corresponding table:

* Using your favorite relational database client (I use Postico(<https://eggerapps.at/postico/>), go to the area/tab that allows you to run a query. Run the first query found in the *data.sql* file. This will create the transport database.

* Then, within the transport database, run the remaining queries found in the *data.sql* file. This will create all of the database tables used by the tranpsport application.

4. Launch the application locally.

* Go back to your terminal and type 'npm start server'. This will start a local server on port 5000.
* Open another terminal session (still at your project location) and type 'npm start client'. This will start the tranSPORT application on port 3000.

## How-to-use the *tran*SPORT

### Create a new Ride Request

1. From the main page, click on the 'Create Ride Request' button.

2. Enter the ride request details on the form and hit the 'Create Ride' button located at the bottom of the screen. You will be presented with a confirmation screen to ensure that ride details are correct. Click on the 'OK' button and a confirmation snackbar appears on the bottom of the screen.

3. Once the rider request is successfully created, you will automatically be brought back to the 'My Rides' screen which displays the rides that you created or the rides that you signed up for.

### Sign up to be a driver for a ride request

1. From the main page, click on the 'All Rides' button. You will be brought to a list of rides in the system. Note: Rides that were created more than 1 day ago will not be shown as they are no longer relevant.

2. Rides that are open for drivers will have an icon of a person hailing a ride. Rides that have a driver will have a car icon assigned to them.

3. Click on a ride to see the full details. Click on the 'Sign up to Drive' button located at the bottom of the ride details'. A confirmation popup will appear -> click 'Yes' to become the assigned driver. A confirmation snackbar will appear on the bottom to confirm the driver signup was successful!

### Withdraw as driver from ride

1. If you are the assigned driver and you choose to withdraw from a ride, simply find the ride in 'My Rides' page, click on the ride to view details and then click on the 'Withdraw as Driver' button.

### Manage user profile

1. You can manage your user profile (name, email, phone number and child name) by clicking on the user profile icon located on the top right-hand portion of the screen.

## Built With/Using

* HTML
* CSS
* JavaScript
* React
* Redux
* Redux-saga
* Material UI
* Axios
* Node.js
* Express
* Postgresql
* Passport

If you have suggestions or questions, please email me at <jenny_alexander@icloud.com>.
