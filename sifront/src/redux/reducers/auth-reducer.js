const initialState = {isAuth: false, user: {name: 'empty', group: 'empty'}};

export default function authReducer ( state = initialState, action ) {
    switch (action.type){
        case 'LOGGED':
            return {user: action.payload, isAuth: true};        
        case 'LOGOUT':
            return {isAuth: false, user: {name: 'empty', group: 'empty'}};
        default:
            return state
    }
}