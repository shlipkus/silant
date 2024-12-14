const initialState = [];

export default function MainDataReducer ( state = initialState, action ) {
    switch (action.type){
        case 'ADDMAINDATA':
            return action.payload;        
        case 'REMOVEMAINDATA':
            return [];
        default:
            return state
    }
}