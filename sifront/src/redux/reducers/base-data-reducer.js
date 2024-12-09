const initialState = {};

export default function BaseDataReducer ( state = initialState, action ) {
    switch (action.type){
        case 'ADDBASEDATA':
            return action.payload;        
        case 'REMOVEBASEDATA':
            return {};
        default:
            return state
    }
}