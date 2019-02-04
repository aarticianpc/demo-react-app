import axios from 'axios';

import { 
    GET_USERS, 
    SEARCH_USERS_BY_NAME, 
    GET_ERRORS, 
    UPDATE_DATE_RANGES,
    USER_FILTER,
    UPDATE_USER_IDS,
    GET_USERS_OPTIONS
 } from './types';

// Default totalUsers
let defaultTotalUsers = 10;

// GET Users
export const getUsers = (totalUsers, userParams) => dispatch => {
    
    // Total users to get
    if(!totalUsers){
        totalUsers = defaultTotalUsers;
    }

    // User filter data
    let userFilter = {}
    if(userParams){
        userFilter = userParams
    }
    axios
        .post(`/api/user/all/${totalUsers}`, userFilter)
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Update Users list
export const searchUserByName = (string) => {
    let result = null;
     
    return axios
            .get(`/api/user/search_by_name/${string}`)
            .then(res => {
                result = {
                    type: SEARCH_USERS_BY_NAME,
                    users: res.data
                };
                return result;
            })
            .catch(err => {return {
                type: SEARCH_USERS_BY_NAME,
                payload: []
            }});
}

// Update date ranges
export const updateDateRanges = (startDate, endDate) => dispatch => {
    dispatch({
        type: UPDATE_DATE_RANGES,
        payload: {
            startDate: startDate,
            endDate: endDate,
            userFilter: true
        }
    });
}


// User userIds toggle
export const updateUserIds = (userIds) => dispatch => {
    dispatch({
        type: UPDATE_USER_IDS,
        payload: {
            userIds: userIds
        }
    });
}

// User filter toggle
export const userFilterToggle = (userFilter) => dispatch => {
    dispatch({
        type: USER_FILTER,
        payload: {
            userFilter: userFilter
        }
    });
}

// GET Users for options
export const getUsersOptions = (totalUsers) => dispatch => {
    
    // Total users to get
    if(!totalUsers){
        totalUsers = defaultTotalUsers;
    }

    axios
        .post(`/api/user/all/${totalUsers}`, {})
        .then(res => {
            dispatch({
                type: GET_USERS_OPTIONS,
                payload: res.data
            });
        })
        .catch(err => dispatch({
            type: GET_USERS_OPTIONS,
            payload: []
        }))
}