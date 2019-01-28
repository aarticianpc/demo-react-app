import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

class UserList extends Component {
  render() {
    const { users } = this.props;
    return users.map(user => <UserItem key={user.id} user={user} />);
  }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList;