/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:48
*/

import React from 'react';
import classNames from 'classnames';

export const renderField = ({input, label, type, meta: {error}}) => {
    const classes = classNames(
        'form-control',
        {
            'is-invalid': error
        }
    );
    return (
        <div className="form-group">

            {label !== null && label !== '' && <label>{label}</label>}
            {type !== 'textarea' && <input {...input} type={type} className={classes}/>}
            {type === 'textarea' && <textarea {...input} className={classes}/>}
            {error && <small className="form-text text-danger">{error}</small>}


        </div>
    );
};