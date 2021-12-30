import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import CreateRidePage from '../CreateRidePage/CreateRidePage';
import RideList from '../RideList/RideList';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import RideDetailsPage from '../RideDetailsPage/RideDetailsPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {/* <Nav /> */}
        {/* <Menu /> */}
        {user.id ? <ResponsiveAppBar /> : ''}
        {/* <ResponsiveAppBar /> */}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route exact path="/about">
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute exact path="/user">
            <HomePage />
          </ProtectedRoute>

          {/* <ProtectedRoute exact path="/info">
            <InfoPage />
          </ProtectedRoute> */}
          {/* 
          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route> */}
          <Route exact path="/login" >
            {user.id ? <HomePage /> : <LoginPage />}
          </Route>

          <Route exact path="/registration" >
            {user.id ? <HomePage /> : <RegisterPage />}
          </Route>

          <Route exact path="/home">
            {user.id ? <HomePage /> : <LoginPage />}
          </Route>

          <Route exact path="/profile">
            {user.id ? <UserProfilePage /> : <LoginPage />}
          </Route>

          <Route exact path="/create">
            {user.id ? <CreateRidePage action='create' /> : <LoginPage />}
          </Route>

          <Route exact path="/view/myrides">
            {user.id ? <RideList filterByUser={true} /> : <LoginPage />}
          </Route>

          <Route exact path="/view/allrides" >
            {user.id ? <RideList filterByUser={false} /> : <LoginPage />}
          </Route>

          <Route exact path="/ride-details">
            {user.id ? <RideDetailsPage /> : <LoginPage />}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
