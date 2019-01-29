import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserItem extends Component {
  render() {
    const { user } = this.props;

    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-lg-6 col-md-4 col-8 d-flex align-items-center">
                    <div className="mr-2">
                        <img className="rounded-circle" src={user.avatar} alt={user.name} style={iconStyle} />
                    </div>
                    <div>
                        <h5>{user.name}</h5>
                        <p className="mb-0">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

const iconStyle = {
    height: '70px',
    width: '70px'
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem;