/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:11
*/

import {requests} from "../agent";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";
import {
    SONG_ERROR, SONG_FORM_UNLOAD,
    SONG_LIST_ERROR, SONG_LIST_RECEIVED,
    SONG_LIST_REQUEST, SONG_LIST_SET_PAGE, SONG_RECEIVED, SONG_REQUEST, SONG_UNLOAD,
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

export const songListReceived = (data, link) => ({
    type: SONG_LIST_RECEIVED,
    data,
    link
});

export const songListFetch = (page = 1) => {

    return (dispatch) => {
        dispatch(songListRequest());
        return requests.get(`/songs?page=${page}`)
            .then(response => dispatch(songListReceived(response)))
            .catch(error => dispatch(songListError(error)));
    }
};

export const songListSetPage = (page, link) => ({
    type: SONG_LIST_SET_PAGE,
    page,
    link
});

export const songListSort = (option, page = 1) => {

    let value;

    switch (option) {

        case 'artistAsc':
            value = '[artist]=asc';
            break;

        case 'artistDesc':
            value = '[artist]=desc';
            break;

        case 'yearAsc':
            value = '[year]=asc';
            break;

        case 'yearDesc':
            value = '[year]=desc';
            break;

        case 'trackAsc':
            value = '[duration]=asc';
            break;

        case 'trackDesc':
            value = '[duration]=desc';
            break;

        default:
            value = '[published]=desc';
            break;

    }

    return (dispatch) => {
        dispatch(songListRequest());
        return requests.get(`/songs?_order${value}&page=${page}`)
            .then(response => dispatch(songListReceived(response, value)))
            .catch(error => dispatch(songListError(error)));
    }

};

//Song actions

export const songRequest = () => ({
    type: SONG_REQUEST,
});

export const songError = (error) => ({
    type: SONG_ERROR,
    error
});

export const songReceived = (data) => ({
    type: SONG_RECEIVED,
    data
});

export const songUnload = () => ({
    type: SONG_UNLOAD
});

export const songFetch = (id) => {
    return (dispatch) => {
        dispatch(songRequest());
        return requests.get(`/songs/${id}`)
            .then(response => dispatch(songReceived(response)))
            .catch(error => dispatch(songError(error)));
    }
};

//Song Upload

export const songAdd = (title, artist, genreName) => {
    let minutes = Math.floor(Math.random() * 10) + 1;
    let seconds = Math.floor(Math.random() * 59) + 1;
    let duration = minutes + ":" + seconds;

    let year = parseInt(Math.random() * (2019 - 1980) + 1980,10);

    return (dispatch) => {
        return requests.post(
            '/songs',
            {
                "title": title,
                "artist": artist,
                "year": year,
                "duration": duration,
                "genre": {
                    "name": genreName

                }
            }
        ).catch((error) => {
            if (401 === error.response.status) {
                return dispatch(userLogout());
            } else if (403 === error.response.status) {
                throw new SubmissionError({
                    _error: 'You do not have rights to publish songs!'
                });
            }
            throw new SubmissionError(parseApiErrors(error));
        })
    }
};

export const songFormUnload = () => ({
    type: SONG_FORM_UNLOAD
});

