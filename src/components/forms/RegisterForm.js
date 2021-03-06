/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:30
*/

import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {userRegisterAttempt} from "../../actions/actions";
import {renderField} from "../../form";


const mapDispatchToProps = {
    userRegisterAttempt
};


class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {termsAccepted: false}
    }

    onSubmit(values) {
        return this.props.userRegisterAttempt(...Object.values(values))
            .then(() => {
                this.props.reset();
                this.props.history.push('/');
            });
    }

    onTermsAcceptedClick(e) {

        this.setState(prevState => ({
            termsAccepted: !prevState.termsAccepted
        }))

    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (

            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="username" label="Username:" type="text" component={renderField}/>
                        <Field name="password" label="Password:" type="password" component={renderField}/>
                        <Field name="retypedPassword" label="Re-type password:" type="password"
                               component={renderField}/>
                        <Field name="email" label="E-mail:" type="text" component={renderField}/>
                        <Field name="name" label="Full Name:" type="text" component={renderField}/>

                        <div className="form-check form-group">
                            <input className="form-check-input" type="checkbox"
                                   value={false}
                                   onClick={this.onTermsAcceptedClick.bind(this)}/>
                            <label className="form-check-label">I agree to the terms and conditions</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-big btn-block"
                                disabled={submitting || !this.state.termsAccepted}>Register
                        </button>
                    </form>
                </div>
            </div>

        )
    }

}

export default reduxForm({
    form: 'RegisterForm'
})(connect(null, mapDispatchToProps)(RegisterForm));