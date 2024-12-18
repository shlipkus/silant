const initialState = {isAuth: false, user: {name: 'empty', group: 'empty', hb: [], sc: [], cl: []}};

export default function authReducer ( state = initialState, action ) {
    switch (action.type){
        case 'LOGGED':
            return {...state, isAuth: true};
        case 'ADDAUTHDATA':
            return {isAuth: true, user: action.payload};        
        case 'LOGOUT':
            return {isAuth: false, user: {name: 'empty', group: 'empty', hb: [], sc: [], cl: []}};
        default:
            return state
    }
}