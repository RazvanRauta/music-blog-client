/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:30
*/

import React from 'react';

class RegisterForm extends React.Component {

    render() {
        const {message} = this.props;
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <div className="card-text">
                        {message}
                    </div>
                </div>
            </div>
        );
    }

}

export default RegisterForm;