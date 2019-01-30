import axios from 'axios';

import { GET_USERS, SEARCH_USERS_BY_NAME, FIND_USERS_BY_ID, FIND_USERS_BY_DATE_RANGE, GET_ERRORS } from './types';

// Default totalUsers
let defaultTotalUsers = 6;

// GET Users
export const getUsers = (totalUsers) => dispatch => {
    if(!totalUsers){
        totalUsers = defaultTotalUsers;
    }
    axios
        .get(`/api/user/all/${totalUsers}`)
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_USERS,
            payload: []
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

// Update Users list
export const findUsersById = (ids) => dispatch => {
    axios
        .post('/api/user/filter_by_ids', { ids: ids })
        .then(res => {
            dispatch({
                type: FIND_USERS_BY_ID,
                payload: res.data
            });
        })
        .catch(err => dispatch({
            type: FIND_USERS_BY_ID,
            payload: []
        }))
}

// Update Users list
export const findUsersByDateRange = (startDate, endDate) => dispatch => {
    axios
        .post('/api/user/filter_by_date_range', { startDate, endDate })
        .then(res => {
            dispatch({
                type: FIND_USERS_BY_DATE_RANGE,
                payload: res.data
            });
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          }))
}