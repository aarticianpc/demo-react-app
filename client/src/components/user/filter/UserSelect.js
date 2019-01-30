import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { searchUserByName, findUsersById, getUsers, findUsersByDateRange } from '../../../actions/userActions';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

// Set default select options
let options = [];

class UserSelect extends Component {

    state = {
        selectedOption: null,
        options: [],
        errors: {},
        startDate: moment(),
        endDate: moment()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    
    handleSelected = (selectedOption) => {
        this.setState({ selectedOption });
        let ids = [];
        selectedOption.map((option) => ids.push(option.value));

        if(ids.length > 0){
            this.props.findUsersById(ids.join());
        } else {
            this.props.getUsers();
        }
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
        this.setState({ 
            startDate: picker.startDate,
            endDate: picker.endDate 
        })
        this.props.findUsersByDateRange(
            picker.startDate.format('YYYY-MM-DD'), 
            picker.endDate.format('YYYY-MM-DD')
        );
    }



    getInitialOptions = () => {
        const { users } = this.props;
        this.setState({ options: [] });
        options = [];
        users.map((user) => options.push({ value: user._id, label: user.name }));
        this.setState({ options: options });
    }

    removeDateRange = () => {
        this.props.getUsers();
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <Select
                            isMulti='true'
                            value={this.state.selectedOption}
                            onChange={this.handleSelected}
                            onInputChange={this.searchUsers}
                            onFocus={this.getInitialOptions}
                            options={this.state.options}
                        />
                    </div>
                    <div className="col-md-6">
                        <DateRangePicker 
                            startDate={this.state.startDate} 
                            endDate={this.state.endDate}
                            onApply={this.filterUsersByDateRange}
                            onCancel={this.removeDateRange}
                        >
                            <button className="btn btn-info">
                                {this.state.startDate.format('YYYY-MM-DD')} to {this.state.endDate.format('YYYY-MM-DD')}
                            </button>
                        </DateRangePicker>
                    </div>
                </div>
                {errors.users && (
                    <div className="alert alert-warning alert-dismissible">
                        {errors.users}
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
    findUsersById: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    findUsersByDateRange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    userSearch: state.user.userSearch,
    errors: state.errors
})

export default connect(mapStateToProps, { findUsersById, getUsers, findUsersByDateRange })(UserSelect);