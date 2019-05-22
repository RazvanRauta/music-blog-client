/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:11
*/

import {requests} from "../agent";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";
import {
    SONG_LIST_ERROR, SONG_LIST_RECEIVED,
    SONG_LIST_REQUEST, SONG_LIST_SET_PAGE,
    USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST,
    USER_SET_ID
} from "./constants";


//User Login action

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.id)))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Username or password is invalid'
                })
            });
    }
};

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
};

//User Logout actions

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
};

//User Profile actions

export const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST
    }
};

export const userProfileError = (userId) => {
    return {
        type: USER_PROFILE_ERROR,
        userId
    }
};

export const userProfileReceived = (userId, userData) => {
    return {
        type: USER_PROFILE_RECEIVED,
        userData,
        userId
    }
};

export const userRegisterAttempt = (username, password, retypedPassword, email, name) => {
    return (dispatch) => {
        return requests.post('/users', {username, password, retypedPassword, email, name}, false)
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error))
            });
    }
};


export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId,
    }
};


export const userProfileFetch = (userId) => {
    return (dispatch) => {

        dispatch(userProfileRequest());
        return requests.get(`/users/${userId}`, true)
            .then(response => dispatch(userProfileReceived(userId, response)))
            .catch(() => dispatch(userProfileError(userId)))

    }
};

//Songs List actions

export const songListRequest = () => ({
    type: SONG_LIST_REQUEST,
});

export const songListError = (error) => ({
    type: SONG_LIST_ERROR,
    error
});

export const songListReceived = (data) => ({
    type: SONG_LIST_RECEIVED,
    data
});

export const songListFetch = (page =1) => {
    return (dispatch) => {
        dispatch(songListRequest());
        return requests.get(`/songs?page=${page}`)
            .then(response => dispatch(songListReceived(response)))
            .catch(error => dispatch(songListError(error)));
    }
};

export const songListSetPage = (page) => ({
    type: SONG_LIST_SET_PAGE,
    page
});
