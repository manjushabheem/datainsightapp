import React, { Component } from 'react';
import './_index.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Data from '../Data/_index';
import {getDataRequestResults} from '../Redux/DataRequest/action'

const mapStateToProps = ( state ) => {    
    return {       
        data: state.dataRequestreducer.data !== null ? state.dataRequestreducer.data.hits : null,
        isDataRequestFetching: state.dataRequestreducer.isFetching,
        //pageCount: state.dataRequestreducer.pageCount,
    };
};

const mapDispatchToProps = ( dispatch ) => ( {
    getDataRequestResults : ( dataParams ) => dispatch( getDataRequestResults( dataParams ) ),
} );

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
        history: PropTypes.object.isRequired,
    }
    componentDidMount() {
        const {getDataRequestResults, match} = this.props;
        //match.params.offset = this.state.offset;
        //match.params.perPage = this.state.perPage;
        getDataRequestResults( match.params || '' );
    }
    /*componentDidUpdate() {
        console.log('componentDidUpdate', this.props);
        const {getDataRequestResults, match} = this.props;
        getDataRequestResults( match.params || '' );
    }*/
  
    render(){
        let {data} = this.props;

        let getData = {}

        if ( data ) {
            getData = data;
        }
        
        return (
            <div>
                <Data data={data} history={this.props.history} />
            </div>
        )
    }
}
export default connect( mapStateToProps, mapDispatchToProps )(DataRequest);
