/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:19
*/

import React from 'react';
import Header from "./elements/Header";
import {Route, Switch} from "react-router";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import {connect} from "react-redux";
import {userLogout, userProfileFetch, userSetId} from "../actions/actions";
import {requests} from "../agent";
import SongListContainer from "./containers/SongListContainer";
import SongContainer from "./containers/SongContainer";
import SongAddForm from "./forms/SongAddForm";


const mapStateToProp = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch,
    userSetId,
    userLogout
};

class App extends React.Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

        if (token) {
            requests.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const {userSetId} = this.props;

        if (userId) {

            userSetId(userId);
            userProfileFetch(userId);

        }

    }

    componentDidUpdate(prevProps) {
        const {userId, userData, userProfileFetch} = this.props;

        if (prevProps.userId !== userId && userId !== null && userData === null) {
            userProfileFetch(userId);
        }
    }

    render() {

        const {isAuthenticated, userData, userLogout} = this.props;


        return (
            <div>
                <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout}/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/register" component={RegisterForm}/>
                    <Route path="/song/:id" component={SongContainer}/>
                    <Route path="/song-form" component={SongAddForm}/>
                    <Route isAuthenticated={isAuthenticated} path="/:page?"  component={SongListContainer}/>
                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(App);