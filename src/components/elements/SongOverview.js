/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 15:41
*/

import React from 'react';
import Message from "./Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import "../css/main.css";


class SongOverview extends React.Component {

    render() {
        const {song} = this.props;


        if (null === song) {
            return (<Message message="Song does not exists!"/>);
        }


        return (
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
                    <div className="col-sm-3 " >
                        <p className="card-text bordet-top song-published">
                            <small className="text-muted">
                                {timeago().format(song.published)}
                            </small>
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="card-text bordet-top">
                            <small className="text-muted">
                                {song.year}
                            </small>
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="card-text bordet-top">
                            <small className="text-muted">
                                {song.genre.name}
                            </small>
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="card-text bordet-top text-right">
                            <small className="text-muted song-user-name">
                                Added by: {song.user.name}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}

export default SongOverview;