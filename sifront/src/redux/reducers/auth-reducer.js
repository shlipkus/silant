const initialState = false;

export default function authReducer ( state = initialState, action ) {
    switch (action.type){
        case 'LOGGED':
            return true;        
        case 'LOGOUT':
            return false;
        default:
            return state
    }
}