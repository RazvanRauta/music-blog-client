/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 15:32
*/

import {
    SONG_REQUEST,
    SONG_RECEIVED,
    SONG_ERROR, SONG_UNLOAD
} from "../actions/constants";

export default (state = {
    song: null,
    isFetching: false
}, action) => {

    switch (action.type) {

        case SONG_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case SONG_RECEIVED:
            return {
                ...state,
                song: action.data,
                isFetching: false
            };

        case SONG_ERROR:
            return {
                ...state,
                isFetching: false,
            };

        case SONG_UNLOAD:
            return {
                ...state,
                isFetching: false,
                song: null
            };

        default:
            return state;

    }
}