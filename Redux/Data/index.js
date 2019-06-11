

export const GET_SEARCH_DATA_REQUEST = 'GET_SEARCH_DATA_REQUEST';
export const GET_SEARCH_DATA_RESPONSE = 'GET_SEARCH_DATA_RESPONSE';


const initialState = {
    data: null,
    isFetching: false,
};

export default function searchReducer( state = initialState, action = {} ) {
    switch ( action.type ) {
        case GET_SEARCH_DATA_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case GET_SEARCH_DATA_RESPONSE:
            return {
                ...state,
                isFetching: false,
                data : action.data,
            };
        default:
            return state;
    }
}
