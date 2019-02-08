import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


export interface PrivateRouteProps {
    auth: any;
}

const PrivateRoute = ({component: Component, auth, ...rest}: any) => (
  <Route 
    {...rest}
    render = {props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

const mapStateToProp = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateToProp, {})(PrivateRoute);
