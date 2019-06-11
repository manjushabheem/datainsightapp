const SET_GENERAL_SETTINGS = 'General/SET_GENERAL_SETTINGS';
const SET_TESTINGTYPE = 'General/SET_TESTINGTYPE';
const SET_DATASHEET_EXTEND = 'General/SET_DATASHEET_EXTEND';
const SET_CREATE_SUCCESS = 'General/SET_CREATE_SUCCESS';
const CLEAR_CREATE_SUCCESS = 'General/CLEAR_CREATE_SUCCESS';

const initialState = {
    isShowNetGross: true,
    createResponse: {},
};

export const setGeneralSettings = ( setting ) => ( { type: SET_GENERAL_SETTINGS, payload: setting } );

export const setTestingType = ( type ) => ( {type: SET_TESTINGTYPE, payload: type} );

export const setDatasheetExtend = ( extended ) => ( {type: SET_DATASHEET_EXTEND, payload: extended} );

export const setCreateSuccess = ( ) => ( {type: SET_CREATE_SUCCESS} );

export const clearCreateSuccess = ( ) => ( {type: CLEAR_CREATE_SUCCESS} );

export default function generalReducer( state = initialState, action = {} ) {
    switch ( action.type ) {
        case SET_GENERAL_SETTINGS: {
            return {...state, ...action.payload };
        }
        case SET_TESTINGTYPE: {
            return {...state, testingType: action.payload};
        }
        case SET_DATASHEET_EXTEND: {
            return {...state, datasheetExpanded: action.payload};
        }
        case SET_CREATE_SUCCESS: {
            return { ...state, createResponse: { success: true }}
        }
        case CLEAR_CREATE_SUCCESS: {
            return { ...state, createResponse: {}}
        }
        default: return state;
    }
}
