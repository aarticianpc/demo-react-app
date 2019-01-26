import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

/**
 * Register user and redirect to login if success
 * @param {Object} userData 
 * @param {Object} history 
 */
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

/**
 * Login user and store token
 * @param {Object} userData 
 */
export const loginUser = userData => dispatch => {
  console.log(userData);
  axios
    .post('/api/auth/login', userData)
    .then(res => {
      // Get the token
      const { token } = res.data;

      // Save token to local storage
      localStorage.setItem('jwtToken', token);

      // Set Authorization header
      setAuthToken(token);

      // Get current user
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

/**
 * Get current login user data decoded from JWT Token 
 * and set into Redux state
 * @param {Object} decoded 
 */
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

/**
 * Logout user
 */
export const logOut = () => dispatch => {
  // Remove local storage
  localStorage.removeItem('jwtToken');

  // Remove auth headers
  setAuthToken(false);

  // Set current user to {} and it will set authentication to false
  dispatch(setCurrentUser({}));
}
