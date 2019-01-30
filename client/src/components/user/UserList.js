import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserItem from './UserItem';
import UserSelect from './filter/UserSelect';
import { getUsers } from '../../actions/userActions';

const GAP = 150;
let totalUsers = 6;
let maxUsers = 6;

class UserList extends Component {

    constructor(props) {
        super(props);
        this.setRootRef = this.setRootRef.bind(this);
      }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    setRootRef(element) {
        this.rootRef = element;
    }

    // Load more users
    handleScroll = (e) => {
        const { rootRef } = this;
        const { innerHeight, scrollY } = window;
        const { offsetTop, scrollHeight } = rootRef;
        if (
            innerHeight + scrollY > (offsetTop + scrollHeight) - GAP
        ) {
            if( this.props.users && totalUsers <= this.props.users.length) {
                totalUsers = totalUsers + maxUsers;
            }
            if(!this.props.userSearch){
                this.props.getUsers(totalUsers);
            }
        }
    }

    render() {
        const { users } = this.props;
        const { setRootRef } = this;
        if(users && users.length > 0){
            const userItem = (
                <div className="profiles" ref={setRootRef}>
                    <div className="row">
                        <div className="col-md-12">
                            <UserSelect users={users} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            { users.map((user) => 
                                <UserItem key={user._id} user={user} />   
                            )}
                        </div>
                    </div>
                </div>
            );
            return userItem;
        } else {
            return (
                <div className="profiles" ref={setRootRef}>
                </div>
            );
        }
    }
}

UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    users: state.user.users,
    userSearch: state.user.userSearch
});

export default connect(
    mapStateToProps,
    { getUsers }
  )(UserList);