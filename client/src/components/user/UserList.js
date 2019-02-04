import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserItem from './UserItem';
import UserSelect from './filter/UserSelect';
import { getUsers } from '../../actions/userActions';
import moment from 'moment';

let totalUsers = 10;
let maxUsers = 10;

class UserList extends Component {

    state = {
        startDate: moment(),
        endDate: moment()
    }

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
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        const { startDate, endDate, userIds } = this.props;

        if (
            windowRelativeBottom === document.documentElement.clientHeight
        ) {
            if( this.props.users && totalUsers <= this.props.users.length) {
                totalUsers = totalUsers + maxUsers;
            }
            this.props.getUsers(totalUsers, {userIds: userIds.join(','), startDate: startDate, endDate: endDate});
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
                            <UserSelect 
                                users={users}
                                totalUsers={totalUsers}
                            />
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
    userSearch: state.user.userSearch,
    startDate: state.user.startDate,
    endDate: state.user.endDate,
    userIds: state.user.userIds
});

export default connect(
    mapStateToProps,
    { getUsers }
  )(UserList);