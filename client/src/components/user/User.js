import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';
import UserList from './UserList';

class User extends Component {

  componentDidMount() {
    if(!this.props.userSearch){
      this.props.getUsers();
    }
  }

  render() {

    const { users } = this.props.user;
    let userContent;
    userContent = <UserList users={users} />;
    
    return ( 
      <div className="user">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {userContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

User.propTypes = {
	getUsers: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
	user: state.user,
	userSearch: state.user.userSearch
})

export default connect(mapStateToProps, { getUsers })(User);