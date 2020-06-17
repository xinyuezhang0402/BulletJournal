import React, {useEffect, useState} from 'react';

import './search.styles.less';
import {Empty, Tooltip} from 'antd';
import {IState} from "../../store";
import {connect} from "react-redux";
import {search, updateSearchTerm} from "../../features/search/action";
import {RouteComponentProps, withRouter} from "react-router";
import {useHistory, useParams} from "react-router-dom";
import {SearchResult, SearchResultItem, searchResultPageSize} from "../../features/search/interface";
import {Loading} from "../../App";
import SearchResultItemElement from "./search-result-item";
import {CloudSyncOutlined} from '@ant-design/icons';
import ReactLoading from "react-loading";

type SearchProps = {
    searchPageNo: number;
    searchResult: SearchResult | undefined;
    searching: boolean;
    search: (term: string, scrollId?: string) => void;
    searchTerm: string;
    updateSearchTerm: (term: string) => void;
};

const LoadingIcon = () => (
    <div className='loading'>
        <ReactLoading type='bubbles' color='#0984e3' height='75' width='75'/>
    </div>
);

const SearchPage: React.FC<SearchProps & RouteComponentProps> =
    ({
         searchPageNo,
         searchResult,
         searching,
         searchTerm,
         search,
         updateSearchTerm
     }) => {
        const [first, setFirst] = useState(true);
        const history = useHistory();
        // get id of note from router
        const {term} = useParams();

        const handleLoadMore = () => {
            if (searchTerm) {
                search(searchTerm, searchResult?.scrollId);
            }
        };

        if (term && first) {
            updateSearchTerm(term);
            setFirst(false);
        }
        useEffect(() => {
            if (!term) {
                return;
            }
            if (searchResult && searchResult.scrollId) {
                search(term, searchResult.scrollId);
            } else {
                search(term);
            }
        }, [term]);

        if (searching) {
            return <div className='search-page'><Loading/></div>;
        }

        if (!searchResult || searchResult.totalHits === 0) {
            return <div className='search-page'><Empty
                description={`No result found for "${term}"`}
            /></div>
        }

        return (
            <div className='search-page'>
                <div>
                    {searchResult.searchResultItemList.map((item: SearchResultItem) => {
                        return <SearchResultItemElement item={item}/>
                    })}
                </div>
                {searching ? (
                    <LoadingIcon/>
                ) : searchResult.totalHits > searchPageNo * searchResultPageSize ? null : (
                    <span className='load-more-button' onClick={handleLoadMore}>
              <Tooltip title='Load More'>
                <CloudSyncOutlined/>
              </Tooltip>
            </span>
                )}
            </div>
        );
    };

const mapStateToProps = (state: IState) => ({
    searchPageNo: state.search.searchPageNo,
    searchResult: state.search.searchResult,
    searching: state.search.searching,
    searchTerm: state.search.term,
});

export default connect(mapStateToProps, {search, updateSearchTerm})(withRouter(SearchPage));