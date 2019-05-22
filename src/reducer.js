/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:13
*/

import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import auth from "./reducers/auth";
import {routerReducer} from "react-router-redux";
import songList from "./reducers/songList";

export default combineReducers({
    auth,
    router: routerReducer,
    form: formReducer,
    songList
});