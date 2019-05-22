/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 12:05
*/

import React from 'react';
import Message from "./Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";

class SongList extends React.Component {

    render() {
        const {songs} = this.props;


        if (null === songs || 0 === songs.length) {
            return (<Message message="No blog posts were found"/>);
        }

        return (<div className="row">

                {songs && songs.map(song => (
                    <div className="col-sm-6" key={song.id}>
                        <div className="card mb-3 mt-3 shadow-sm">
                            <Link to={`/song/${song.id}`}>
                                <div className="card-header">{song.artist}</div>
                            </Link>
                            <div className="card-body text-primary">
                                <h5 className="card-title">
                                    <Link to={`/song/${song.id}`}>
                                        {song.title}</Link>
                                </h5>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="card-text bordet-top">
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
                                                {song.user.name}
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