import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from './promiseMiddleware';
//import filterReducer from './Filter';
//import checkboxReducer from './Checkbox';
import generalReducer from './General';
//import breadCrumbReducer from './BreadCrumb';
import loginReducer from './Login';
//import searchReducer from './Search'
//import searchAllDataReducer from './Search'
import dataRequestreducer from './DataRequest'
//import newRequestDatareducer from './NewRequest'
import { reducer as formReducer } from 'redux-form'
const middleWares = [ multi, thunk, promiseMiddleware ];

if ( process.env.NODE_ENV === 'development' ) {
    middleWares.push( require( 'redux-logger' ).default )
}

const finalCreateStore = composeWithDevTools(
    applyMiddleware( ...middleWares )
)( createStore )

let rootReducer = combineReducers( {
    //filters: filterReducer,
    //checkBoxes: checkboxReducer,
    general: generalReducer,
    //breadCrumb: breadCrumbReducer,
    login : loginReducer,
    //searchReducer:searchReducer,
    //searchAllDataReducer:searchAllDataReducer,
    dataRequestreducer:dataRequestreducer,
    //newRequestDatareducer:newRequestDatareducer,
    form: formReducer,
} );

const initialState = window.__INITIAL_STATE__;
export const store = finalCreateStore( rootReducer, initialState );

