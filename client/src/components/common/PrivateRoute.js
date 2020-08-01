import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Parameters are Component name, path, exact, and auth.
//Usage Checking user is authenticated to navigate the given component from App.js
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={
      props =>
        auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/' />
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);