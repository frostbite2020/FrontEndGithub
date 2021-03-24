import * as constants from '../constant';

const defaultState = {
    token: null,
    isLoggedIn: false,

}

const userInfo = localStorage.getItem('USER_INFO');

const INITIAL_STATE = userInfo ? JSON.parse(userInfo) : defaultState;

export default function userReducers(state = INITIAL_STATE, action) {
    switch (action.type){
        case constants.SET_USER_INFO:
            return {...action.payload};
        case constants.RESET_USER_INFO:
            return {...defaultState};
        default:
            return state; 
    }
}


