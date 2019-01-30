import axios from 'axios';

import { GET_USERS, UPDATE_USERS_LIST } from './types';

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
            payload: null
        }))
}

// Update Users list
export const updateUsersList = (users) => dispatch => {
    dispatch({
        type: UPDATE_USERS_LIST,
        payload: users
    })
}