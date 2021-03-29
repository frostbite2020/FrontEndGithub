import * as constants from '../constant'


export const registerUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method : 'POST', 
        url : '/auth/register', 
        data, 
        success: (response) => (setUserInfo(response)), 
        postProcessSuccess: onSuccess,      
        postProcessError : onError
    }
});

export const loginUser = (data, onSuccess, onError) => ({
    type : constants.API,
    payload: {
        method: 'POST',
        url: '/auth/login',
        data, 
        success:(response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const logOutUser = () => {
    localStorage.removeItem('USER_INFO');
    return {type: constants.RESET_USER_INFO};
};

const setUserInfo = (data) => {
    const userInfo = {
        userId: data.id,
        username: data.username, 
        fullName: `${data.firstName} ${data.lastName}`,
        token: data.token, 
        isLoggedIn : true
    };
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return {type: constants.SET_USER_INFO, payload: userInfo};
};