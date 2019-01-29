import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

class UserList extends Component {
  render() {
    const { users } = this.props;
    if(users){
        const userItem = (
            <div className="profiles">
                { users.map((user) => 
                    <UserItem key={user._id} user={user} />   
                )}
            </div>
        );
        return userItem;
    } else {
        return null;
    }
  }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList;