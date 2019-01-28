import axios from 'axios';

import { GET_USERS } from './types';

// GET Users
export const getUsers = () => dispatch => {
    axios
        .get('/api/user/all')
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