/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:50
*/

import {
    SONG_LIST_REQUEST,
    SONG_LIST_ADD,
    SONG_LIST_RECEIVED,
    SONG_LIST_ERROR, SONG_LIST_SET_PAGE, SONG_FORM_UNLOAD
} from "../actions/constants";
import {hydraPageCount} from "../apiUtils";

export default (state = {
    songs: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null,
    link:null
}, action) => {
    switch (action.type) {
        case SONG_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
            };
            return state;

        case SONG_LIST_RECEIVED:
            state = {
                ...state,
                songs: action.data['hydra:member'],
                pageCount: hydraPageCount(action.data),
                isFetching: false,
                link:action.link
            };

            return state;

        case SONG_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                songs: null
            };

        case SONG_LIST_ADD:
            state = {
                ...state,
                songs: state.songs ? state.songs.concat(action.data) : state.songs
            };
            return state;

        case SONG_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page,

            };

        case SONG_FORM_UNLOAD:
            return {
                ...state,
            };

        default:
            return state;

    }
}