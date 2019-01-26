import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Landing extends Component {
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Demo Application</h1>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla suscipit sapiente consequatur laboriosam doloremque. Ipsam delectus aperiam, nobis, reiciendis ullam eligendi iure fuga rem molestias eos, minima iusto a quis!</p>
                <hr />
                <Link to="register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProp = state => ({
  auth: state.auth
});

export default connect(mapStateToProp, {})(Landing);
