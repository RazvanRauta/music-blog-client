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
            {type === 'text' && <input {...input} type={type} className={classes}/>}
            {type === 'password' && <input {...input} type={type} className={classes}/>}
            {type === 'select' && <select {...input} className={classes}>
                <option defaultValue>Select Genre</option>
                <option value="Blues">Blues</option>
                <option value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Folk">Folk</option>
                <option value="New age">New age</option>
                <option value="Reggae">Reggae</option>
            </select>

            }


            {error && <small className="form-text text-danger">{error}</small>}


        </div>
    );
};