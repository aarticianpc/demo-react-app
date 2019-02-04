import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { 
    searchUserByName, 
    getUsers, 
    updateDateRanges, 
    userFilterToggle, 
    updateUserIds,
    getUsersOptions
} from '../../../actions/userActions';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

// Set default select options
let options = [];
let totalOptionUsers = 10;

class UserSelect extends Component {

    state = {
        selectedOption: null,
        options: [],
        errors: {},
        userSearchIds: [],
        userSearchFilter: false,
        userDateFilter: false
    }

    componentDidMount() {
        this.props.getUsersOptions(totalOptionUsers);
        totalOptionUsers = totalOptionUsers + 10;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    
    handleSelected = (selectedOption) => {
        const { startDate, endDate } = this.props;

        this.setState({ selectedOption });
        let ids = [];
        selectedOption.map((option) => ids.push(option.value));

        this.props.updateUserIds(ids);

        this.props.getUsers(this.props.totalUsers, {
            userIds: ids.join(','),
            startDate: startDate ? startDate.format('YYYY-MM-DD') : false,
            endDate: endDate ? endDate.format('YYYY-MM-DD') : false
        });
    }

    searchUsers = (searchString) => {
        if(searchString){
            searchUserByName(searchString).then(res => {
                this.setState({ options: [] });
                options = [];
                res.users.map((user) => options.push({ value: user._id, label: user.name }));
                this.setState({ options: options });
            });
        }
    }

    filterUsersByDateRange = (e, picker) => {

        const { userIds } = this.props;

        this.props.updateDateRanges(picker.startDate, picker.endDate);

        this.props.getUsers(this.props.totalUsers, {
            userIds: userIds.join(','),
            startDate: picker.startDate.format('YYYY-MM-DD'),
            endDate: picker.endDate.format('YYYY-MM-DD')
        });
    }



    getInitialOptions = () => {
        const { users } = this.props;
        this.setState({ options: [] });
        options = [];
        users.map((user) => options.push({ value: user._id, label: user.name }));
        this.setState({ options: options });
    }

    removeDateRange = () => {
        const { startDate, endDate } = this.props;

        this.props.getUsers(this.props.totalUsers, {
            userIds: this.state.userSearchIds.join(','),
            startDate: startDate ? startDate.format('YYYY-MM-DD') : false,
            endDate: endDate ? endDate.format('YYYY-MM-DD') : false
        });
    }

    toggleUserSearch = (e) => {
        e.preventDefault();
        if(this.state.userSearchFilter){
            this.setState({ userSearchFilter: false });
            this.props.userFilterToggle(false);
            this.props.updateUserIds([]);
            this.removeDateRange();
            this.setState({selectedOption: null});
        } else {
            this.setState({ userSearchFilter: true });
            this.props.userFilterToggle(true);
        }
    }

    toggleDateSearch = (e) => {
        e.preventDefault();
        if(this.state.userDateFilter){
            this.setState({ userDateFilter: false });
            this.props.userFilterToggle(false);
            this.props.updateDateRanges(false, false);
        } else {
            this.setState({ userDateFilter: true });
            this.props.userFilterToggle(true);
        }

    }

    handleOptionsScroll = (e) => {
        this.props.getUsersOptions(totalOptionUsers);
        totalOptionUsers = totalOptionUsers + 10;

        const { userOptions } = this.props;
        console.log(userOptions);
        this.setState({ options: [] });
        options = [];
        userOptions.map((user) => options.push({ value: user._id, label: user.name }));
        this.setState({ options: options });

        console.log('scroll to bottom on options');
    }

    render() {
        const { errors } = this.state;
        const { startDate, endDate } = this.props;

        let dateRanges = startDate ? (startDate.format('YYYY-MM-DD') + ' to ' + endDate.format('YYYY-MM-DD')) : 'Select Date Range';

        let userSearchOption = '';
        let userSearchCancel = '';
        let userDateOption = '';
        let userDateCancel = '';

        if(this.state.userSearchFilter) {
            userSearchOption = <Select
                isMulti='true'
                value={this.state.selectedOption}
                onChange={this.handleSelected}
                onInputChange={this.searchUsers}
                onFocus={this.handleOptionsScroll}
                options={this.state.options}
                onMenuScrollToBottom={this.handleOptionsScroll}
            />;
            userSearchCancel = <button className='btn btn-danger' onClick={this.toggleUserSearch}>X</button>;
        }
        if(this.state.userDateFilter) {
            userDateOption = <DateRangePicker 
                    startDate={startDate ? startDate : moment()} 
                    endDate={endDate ? endDate : moment()}
                    onApply={this.filterUsersByDateRange}
                    onCancel={this.removeDateRange}
                >
                    <button className="btn btn-info">
                        {dateRanges}
                    </button>
                </DateRangePicker>;
                userDateCancel = <button className='btn btn-danger' onClick={this.toggleDateSearch}>X</button>;
        }

        return (
            <div>
                <div className="row mb-4">
                    <div className="col-md-5">
                        {userSearchOption}
                    </div>
                    <div className="col-md-1">
                        {userSearchCancel}
                    </div>
                    <div className="col-md-3">
                        <div className="float-right">
                            {userDateOption}
                        </div>
                    </div>
                    <div className="col-md-1">
                        {userDateCancel}
                    </div>
                    <div className="col-md-2 text-right">
                        <div className="dropdown">
                            <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button" id="dropdownMenuButton" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false"
                            >
                                Filter
                            </button>
                            {this.state.userDateFilter}
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="dropdown-item" onClick={this.toggleUserSearch}>User Search</button>
                                <button className="dropdown-item" onClick={this.toggleDateSearch}>Date Range</button>
                            </div>
                        </div>
                    </div>
                </div>
                {errors.noprofile && (
                    <div className="alert alert-warning alert-dismissible">
                        {errors.noprofile}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

UserSelect.propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    totalUsers: PropTypes.number.isRequired,
    updateDateRanges: PropTypes.func.isRequired,
    userFilterToggle: PropTypes.func.isRequired,
    updateUserIds: PropTypes.func.isRequired,
    getUsersOptions: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    userSearch: state.user.userSearch,
    startDate: state.user.startDate,
    endDate: state.user.endDate,
    errors: state.errors,
    userFilter: state.user.userFilter,
    userIds: state.user.userIds,
    userOptions: state.user.userOptions
})

export default connect(mapStateToProps, { 
    getUsers, 
    updateDateRanges, 
    userFilterToggle, 
    updateUserIds,
    getUsersOptions
})(UserSelect);