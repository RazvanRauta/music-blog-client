/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 12:06
*/

import React from 'react';

class Message extends React.Component {

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

export default Message;