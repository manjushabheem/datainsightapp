import config from '../appConfig';
let getApiBaseUrl = () => {
    let retval = 'http://'
    + ( location.hostname === 'localhost' ? 'localhost' : config.apiURL )
    + ( config.apiPort ? ':' + config.apiPort : '' )
    + '/api';
    return retval;
}

let getPostOptions = ( body ) => {

  return {
    method: 'POST',
    body: JSON.stringify( body ),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
  };
};
let downloadCSV = ( args ) => {
    let data, filename, link;
    let csv = args.csvData;
    if ( !csv || csv === null ) {
        return;
    }

    filename = args.fileName || 'export.csv';

    if ( !csv.match( /^data:text\/csv/i ) ) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI( csv );

    link = document.createElement( 'a' );
    link.setAttribute( 'href', data );
    link.setAttribute( 'download', filename );
    link.click();
};

let getCookie = ( name ) => {

    let nameEQ = name + '=';
    let ca = document.cookie.split( ';' );
    for ( let i = 0;i < ca.length;i++ ) {
        let c = ca[i];
        while ( c.charAt( 0 ) === ' ' ) {
            c = c.substring( 1, c.length );
        }
        if ( c.indexOf( nameEQ ) === 0 ) {
            return c.substring( nameEQ.length, c.length );
        }
    }
    return null;

};

let setCookie = ( name, value, days ) => {

    let expires;
    if ( days ) {
        let date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = '; expires=' + date.toGMTString();
    } else {
        expires = '';
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
};

let eraseCookie = ( name ) => {

    setCookie( name, '', -1 );

};

let getLocalStorage = (key) => {
    return localStorage.getItem(key);
};

let setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

let eraseLocalStorage = (key) => { 
    localStorage.removeItem(key);
};

let clearLocalStorage = () => {
    localStorage.clear();
};

const apiRequest = ( endpoint, data ) => {
    return fetch( endpoint, data )
        .then( ( response ) => {
            return response.json().then( ( data ) => {
                return data;
            } );
        } );
};

const getRegexBySerachKey = ( searchKey ) => {
    let regExp;
    if ( searchKey ) {
        if ( !searchKey.endsWith( '*' ) && searchKey.startsWith( '*' ) ) {
            regExp = new RegExp( '(' + searchKey.replace( /\*/g, '' ) + ')$', 'i' );
        } else {
            regExp = new RegExp( '(' + searchKey.replace( /\*/g, '' ) + ')', 'i' );
        }
    }
    return regExp;
};
const getHdfsPrefix = () => {
    return config.hdfs;
};
const utils = {
    getApiBaseUrl,
    getPostOptions,
    downloadCSV,
    getCookie,
    setCookie,
    eraseCookie,
    getLocalStorage, 
    setLocalStorage, 
    eraseLocalStorage, 
    clearLocalStorage,
    apiRequest,
    getRegexBySerachKey,
    getHdfsPrefix,
};
export default utils;
