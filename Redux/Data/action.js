import {GET_SEARCH_DATA_REQUEST, GET_SEARCH_DATA_RESPONSE} from './index.js'
import Utils from '../../_shared/_utils';
const apiURL = 'search-request';
export function getSearchResults(){
    return ( dispatch ) => {
        dispatch( {type:GET_SEARCH_DATA_REQUEST} );
        fetch( `${Utils.getApiBaseUrl()}/${apiURL}` ).then( ( response ) => {
            return response.json();
          } ).then( ( data ) => {
            dispatch( {type:GET_SEARCH_DATA_RESPONSE, data :data} );
          } );
    }
}
