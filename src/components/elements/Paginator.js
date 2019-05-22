/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 13:23
*/

import React from 'react';
import classNames from 'classnames';

class Paginator extends React.Component {

    constructor(props) {
        super(props);
        const {pageCount} = this.props;
        this.range = [];

        for (let i = 1; i <= pageCount; i++) {
            this.range.push(i);
        }
    }

    render() {
        const {currentPage, setPage, nextPage, prevPage} = this.props;
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={prevPage}>
                            Previous
                        </button>
                    </li>

                    {
                        this.range.map(page => {
                            const onClick = () => {
                                setPage(page);
                            };
                            return (
                                <li key={page} className={classNames(
                                    'page-item',
                                    {
                                        active: currentPage === page
                                    }
                                )}>
                                    <button className="page-link" onClick={onClick}>
                                        {page}
                                    </button>
                                </li>
                            );
                        })
                    }

                    <li className="page-item">
                        <button className="page-link" onClick={nextPage}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        )

    }

}

export default Paginator;