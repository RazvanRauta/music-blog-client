/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:55
*/

import React from 'react';
import {songListFetch, songListSetPage, songListSort} from "../../actions/actions";
import Spinner from "../elements/Spinner";
import SongList from "../elements/SongList";
import Paginator from "../elements/Paginator";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.songList,
    ...state.auth
});

const mapDispatchToProps = {
    songListFetch,
    songListSetPage,
    songListSort

};

class SongListContainer extends React.Component {

    componentDidMount() {

        this.props.songListFetch(this.getQueryParamPage());
    }

    componentDidUpdate(prevProps) {
        const {currentPage, songListSetPage,songListSort,link} = this.props;


        if (prevProps.match.params.page !== this.getQueryParamPage()) {
            songListSetPage(this.getQueryParamPage());
        }

        if (prevProps.currentPage !== currentPage)
            songListSort(link,currentPage);
    }

    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    changePage(page) {
        const {history, songListSetPage} = this.props;
        songListSetPage(page);
        history.push(`/${page}`);
    }

    onNextPageClick(e) {
        const {currentPage, pageCount} = this.props;
        const newPage = Math.min(currentPage + 1, pageCount);
        this.changePage(newPage);

    }

    onPrevPageClick(e) {
        const {currentPage} = this.props;
        const newPage = Math.max(currentPage - 1, 1);
        this.changePage(newPage);

    }

    onSelect(option){

         const{history,songListSort,currentPage} = this.props;
        songListSort(option,currentPage);
        history.push(`/${option}&page=${currentPage}`)
    }


    render() {
        const {songs, isFetching, currentPage, pageCount, isAuthenticated} = this.props;


        if (isFetching) {
            return (<Spinner/>);
        }

        return (
            <div>
                <SongList songs={songs} sort={this.onSelect.bind(this)} isAuthenticated={isAuthenticated}/>
                <Paginator currentPage={currentPage} pageCount={pageCount}
                           setPage={this.changePage.bind(this)}
                           nextPage={this.onNextPageClick.bind(this)}
                           prevPage={this.onPrevPageClick.bind(this)}/>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SongListContainer);