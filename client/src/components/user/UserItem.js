import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UserItem extends Component {
  render() {

    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-md-3">
            <img
                className="rounded-circle d-none d-md-block"
                src={user.avatar}
                alt=""
            />
        </div>
        <div className="col-md-3">
            {user.name}
        </div>
        <div className="col-md-3">
            {user.email}
        </div>
      </div>
    )
  }
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(UserItem);