/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:13
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';
import {ConnectedRouter} from "react-router-redux";
import {Route} from "react-router";
import reducer from "./reducer";
import {createBrowserHistory} from "history";
import App from "./components/App";
import {tokenMiddleware} from "./middleware";
import thunkMiddleware from "redux-thunk";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, tokenMiddleware)
);

const history = createBrowserHistory();

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));