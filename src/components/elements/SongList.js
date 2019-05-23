/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 12:05
*/

import React from 'react';
import Message from "./Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import "../css/main.css"

class SongList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {sort} = this.props;
        this.setState({value: event.target.value});
        sort(event.target.value);

    }


    render() {
        const {songs} = this.props;


        if (null === songs || 0 === songs.length) {
            return (<Message message="No songs were found"/>);
        }

        return (
            <div className="row songsRow">

                <div className="row col-order align-content-center">
                    <div className="col-md-4 mySelect text-right">
                        <select value={this.state.value} onChange={this.handleChange} className="custom-select">
                            <option defaultValue>Sort By Artist</option>
                            <option value="artistAsc">By Artist: Ascending</option>
                            <option value="artistDesc">By Artist: Descending</option>
                        </select>
                    </div>
                    <div className="col-md-4 mySelect text-right">
                        <select value={this.state.value} onChange={this.handleChange} className="custom-select">
                            <option defaultValue>Sort By Year</option>
                            <option value="yearAsc">By Year: Ascending</option>
                            <option value="yearDesc">By Year: Descending</option>
                        </select>
                    </div>
                    <div className=" col-md-4 mySelect text-right">
                        <select value={this.state.value} onChange={this.handleChange} className="custom-select">
                            <option defaultValue>Sort By Track Length</option>
                            <option value="trackAsc">By Track Length: Ascending</option>
                            <option value="trackDesc">By Track Length: Descending</option>
                        </select>
                    </div>
                </div>

                {songs && songs.map(song => (
                    <div className="col-sm-6" key={song.id}>
                        <div className="card mb-3 mt-3 shadow-sm">
                            <Link to={`/song/${song.id}`}>
                                <div className="card-header">{song.artist}</div>
                            </Link>
                            <div className="row">
                                <div className="card-body text-primary text-left">
                                    <div className="col-sm-9" key={song.id}>
                                        <h5>
                                            <Link to={`/song/${song.id}`}>
                                                {song.title}</Link>
                                        </h5>
                                    </div>
                                    <div className="col-sm-12 text-right">
                                        <p>
                                            Track length: {song.duration}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="card-text bordet-top song-element">
                                        <small className="text-muted">
                                            {timeago().format(song.published)}
                                        </small>
                                    </p>
                                </div>
                                <div className="col-sm-3">
                                    <p className="card-text bordet-top song-element">
                                        <small className="text-muted">
                                            {song.year}
                                        </small>
                                    </p>
                                </div>
                                <div className="col-sm-3">
                                    <p className="card-text bordet-top song-element">
                                        <small className="text-muted">
                                            {song.genre.name}
                                        </small>
                                    </p>
                                </div>
                                <div className="col-sm-3">
                                    <p className="card-text bordet-top song-element">
                                        <small className="text-muted">
                                            Added by:<br/>{song.user.name}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        )
    }

}


export default SongList;