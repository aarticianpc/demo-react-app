import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from "./components/layout/Landing";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import PrivateRoute from './common/PrivateRoute';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from './components/dashboard/Dashboard';

// Check for token
if(localStorage.jwtToken) {
  // set auth & token in header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  let decoded, exp = jwt_decode(localStorage.jwtToken);
  console.log(decoded);
  // set current user & Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expire token
  const currentTime = Date.now() / 1000;
  if(currentTime > exp) {
    // logout user
    store.dispatch(setCurrentUser({}));
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>;
  }
}

export default App;
