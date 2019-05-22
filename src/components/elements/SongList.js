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


        if (null === songs || 0 === songs.length){
            return (<Message message = "No blog posts were found"/>);
        }

        return (<div>

                {songs && songs.map(song =>(
                    <div className="card mb-3 mt-3 shadow-sm" key={song.id}>
                        <div className="card-body">
                            <h3><Link to={`/songs/${song.id}`}>{song.title}</Link></h3>
                            <p className="card-text bordet-top">
                                <small className="text-muted">
                                    {timeago().format(song.published)}
                                </small>
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        )
    }

}


export default SongList;