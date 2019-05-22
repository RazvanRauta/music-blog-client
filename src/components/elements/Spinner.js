/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:22
*/

import React from 'react';

class Spinner extends React.Component {

    render() {
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <i className="fas fa-spinner fa-spin"/>
                </div>
            </div>
        );
    }

}

export default Spinner;