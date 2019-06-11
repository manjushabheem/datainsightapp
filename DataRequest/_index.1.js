import React, { Component } from 'react';
import './_index.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Data from '../Data/_index';
import {getDataRequestResults} from '../Redux/DataRequest/action'
import ReactPaginate from 'react-paginate';

const mapStateToProps = ( state ) => {
    return {
        createResponse: state.general.createResponse,
        data: state.dataRequestreducer.data !== null ? state.dataRequestreducer.data.hits : null,
        isDataRequestFetching: state.dataRequestreducer.isFetching,
        pageCount: state.dataRequestreducer.pageCount,
    };
};

const mapDispatchToProps = ( dispatch ) => ( {
    getDataRequestResults : ( dataParams ) => dispatch( getDataRequestResults( dataParams ) ),
} );

@connect( mapStateToProps, mapDispatchToProps )
class DataRequest extends Component {
    constructor( props ) {
        super( props );
        this.state = {
          show: false,
          offset: 0,
          perPage: 10, // TODO: needs to come from config & preferences later
          currDataState: 'all',
          selected: null,
        }
    }
    static propTypes = {
        getDataRequestResults:PropTypes.func,
        data:PropTypes.object,
        isDataRequestFetching:PropTypes.bool,
        pageCount: PropTypes.number,
        match: PropTypes.object,
    }
    componentDidMount() {       
        const {getDataRequestResults, match} = this.props;
        match.params.offset = this.state.offset;
        match.params.perPage = this.state.perPage;
        getDataRequestResults( match.params || '' );
    }
    handlePageClick = ( data ) => {
        let selected = data.selected;
        let offset = Math.ceil( selected * this.state.perPage );
        this.setState( { offset: offset, selected: selected } );
        this.setState( {offset: offset}, () => {
            const {getDataRequestResults, match} = this.props;
            match.params.offset = this.state.offset;
            match.params.perPage = this.state.perPage;
            getDataRequestResults( match.params || '' );
        } );
    };
    onSelectDataState = ( currDataState ) => {
        this.setState( { currDataState: currDataState } );
        let offset = 0;
        let selected = 0;
        this.setState( {offset: offset, selected: selected}, () => {
          const {getDataRequestResults, match} = this.props;
          match.params.dstate = currDataState;
          match.params.offset = this.state.offset;
          match.params.perPage = this.state.perPage;
          getDataRequestResults( match.params || '' );
        } );
    }
  render(){
    let {data, isDataRequestFetching, pageCount} = this.props;
    let pageTotal = Math.ceil( pageCount / this.state.perPage );
    return (
        <div>
        <Data data={data} isFetch={isDataRequestFetching} isSearch={false} onSelectDataState={this.onSelectDataState} totalResults={pageCount}/>
        {pageTotal > 0 ?
            <div className="search_pagination">
            <ReactPaginate previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={<a href="">...</a>}
                breakClassName={'break-me'}
                pageCount={pageTotal}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                forcePage={this.state.selected}/>
            </div>
        : '' }
        </div>
    )
  }
}
export default DataRequest;
