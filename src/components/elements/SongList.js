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
        const {songs, isAuthenticated} = this.props;

        console.log(this.props);


        if (null === songs || 0 === songs.length) {
            return (<Message message="No blog posts were found"/>);
        }

        return (<div className="row">

                {songs && songs.map(song => (
                    <div className="col-sm-6" key={song.id}>
                        <Link to={`/song/${song.id}`}>
                            <div className="card mb-3 mt-3 shadow-sm">
                                <div className="card-header">{song.artist}</div>
                                <div className="card-body text-primary">
                                    <h5 className="card-title">
                                        {song.title}
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
                                        {isAuthenticated && <div className="col-sm-3">
                                            <p className="card-text bordet-top">
                                                <small className="text-muted">
                                                    {song.user}
                                                </small>
                                            </p>
                                        </div>}
                                        {isAuthenticated && <div className="col-sm-3">
                                            <p className="card-text bordet-top">
                                                <small className="text-muted">
                                                    {song.genre}
                                                </small>
                                            </p>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        )
    }

}


export default SongList;