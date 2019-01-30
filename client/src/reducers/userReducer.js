import { GET_USERS, FIND_USERS_BY_ID, FIND_USERS_BY_DATE_RANGE } from '../actions/types';
import isEmpty from '../validation/isEmpty';

const initialState = {
    users: [],
    user: {},
    loading: false,
    userSearch: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                userSearch: false
            }
        case FIND_USERS_BY_ID:
        case FIND_USERS_BY_DATE_RANGE:
            return {
                ...state,
                users: action.payload,
                userSearch: !isEmpty(action.payload)
            }
        default:
            return state;
    }
}