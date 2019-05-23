/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:30
*/

import React from 'react';
import {userLoginAttempt} from "../../actions/actions";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../form";
import {connect} from "react-redux";

const mapStateToProp = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt
};

class LoginForm extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {

            this.props.history.push('/');
        }
    }

    onSubmit(values) {

        return this.props.userLoginAttempt(
            values.username,
            values.password
        )

    }

    render() {
        const {handleSubmit, error} = this.props;

        return (
            <div className="text-center">

                {error && <div className="alert alert-danger">{error}</div>}

                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="username" label="Username" type="text" component={renderField}/>
                    <Field name="password" label="Password" type="password" component={renderField}/>
                    <button type="submit" className="btn btn-primary btn-big btn-block">Log in</button>
                </form>
            </div>
        )
    }

}

export default reduxForm({
    form: 'LoginForm'
})(connect(mapStateToProp, mapDispatchToProps)(LoginForm));