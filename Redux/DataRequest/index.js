

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_RESPONSE = 'GET_DATA_RESPONSE';


const initialState = {
    data: null,
    isFetching: false,
};

export default function dataRequestreducer( state = initialState, action = {} ) {
    switch ( action.type ) {
        case GET_DATA_REQUEST:
        return {
                ...state,
                isFetching: true,
            };
        case GET_DATA_RESPONSE:
            return {
                ...state,
                isFetching: false,
                data : action.data,
                pageCount : action.data.hits.total,
            };
        default:
            return state;
    }
}
