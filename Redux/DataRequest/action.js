import {GET_DATA_REQUEST, GET_DATA_RESPONSE} from './index.js'
import Utils from '../../_shared/_utils';
const apiURL = 'datarequest';
export function getDataRequestResults( dataParams ){
    
    return ( dispatch ) => {
        dispatch( {type:GET_DATA_REQUEST} );
        let userid = Utils.getLocalStorage( 'ldapid' );        
        let dstate = '';
        if ( dataParams.dstate && dataParams.dstate !== 'all' ) {
            dstate = dataParams.dstate;
        } else {
            dstate = '';
        }
        let from = dataParams.offset;
        let size = dataParams.perPage;
        /*fetch( `${Utils.getApiBaseUrl()}/${apiURL}?u=${userid}&from=${from}&size=${size}&dstate=${dstate}` ).then( ( response ) => {
            return response.json();
          } ).then( ( data ) => {
            dispatch( {type:GET_DATA_RESPONSE, data :data} );
        } );*/
        fetch( `${Utils.getApiBaseUrl()}/${apiURL}?u=${userid}` ).then( ( response ) => {
            return response.json();
          } ).then( ( data ) => {
           
            dispatch( { type:GET_DATA_RESPONSE, data :data.result } );
        } );
    }
}

export function getAllDataRequestResults(){
    return ( dispatch ) => {
        dispatch( {type:GET_DATA_REQUEST} );
        let userid = Utils.getLocalStorage( 'username' );
        fetch( `${Utils.getApiBaseUrl()}/${apiURL}?u=${userid}` ).then( ( response ) => {
            return response.json();
          } ).then( ( data ) => {
            dispatch( { type:GET_DATA_RESPONSE, data :data } );
          } );
    }
}
