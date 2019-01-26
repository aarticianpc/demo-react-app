import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { user } = this.props.auth;
    
    return <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img className="rounded-circle" src={user.avatar} alt="" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{user.name}</h1>
          </div>
        </div>
      </div>
    </div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProp = state => ({
  auth: state.auth
});

export default connect(mapStateToProp, {})(Dashboard);
