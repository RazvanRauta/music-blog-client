/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 15:39
*/

import React from 'react';
import {connect} from "react-redux";
import {songFetch, songUnload} from "../../actions/actions";
import Spinner from "../elements/Spinner";
import SongOverview from "../elements/SongOverview";

const mapStateToProps = state => ({
    ...state.song
});

const mapDispatchToProps = {
    songFetch,
    songUnload
};

class SongContainer extends React.Component {
    componentDidMount() {
        this.props.songFetch(this.props.match.params.id);
    }

    componentWillMount() {

        this.props.songUnload();

    }

    render() {
        const {isFetching, song} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }

        return (
            <div>
                <SongOverview song={song}/>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer);
