/*
 * @author: Razvan Rauta
 * Date: 23.05.2019
 * Time: 16:33
*/

import React from 'react';
import {songAdd, songFormUnload} from "../../actions/actions";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {canAddSong} from "../../apiUtils";
import {renderField} from "../../form";
import "../css/main.css"


const mapDispatchToProps = {
    songAdd,
    songFormUnload
};

const mapStateToProps = state => ({
    userData: state.auth.userData,
});

class SongAddForm extends React.Component {


    onSubmit(values) {
        const {songAdd, reset, history} = this.props;

        return songAdd(values.title, values.artist,values.genre)
            .then(() => {
                reset();
                history.push('/');
            });
    }

    componentWillUnmount() {
        this.props.songFormUnload();
    }


    render() {
        if (!canAddSong(this.props.userData)) {
            return <Redirect to="/login"/>
        }

        const {submitting, handleSubmit, error} = this.props;

        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="artist" label="Artist: " type="text" component={renderField}/>
                        <Field name="title" label="Title:" type="text" component={renderField}/>
                        <Field name="genre" label="Genre:" type="select" className="custom-select " component={renderField}/>
                        <br/>
                        <br/>

                        <button type="submit" className="btn btn-primary btn-big btn-block songFormBtn"
                                disabled={submitting}>
                            Add Song!
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'SongAddForm'
})(connect(mapStateToProps, mapDispatchToProps)(SongAddForm))