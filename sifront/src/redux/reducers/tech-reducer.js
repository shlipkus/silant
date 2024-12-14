const initialState = '';

export default function TechReducer ( state = initialState, action ) {
    switch (action.type){
        case 'ADDTECH':
            return action.payload;        
        case 'REMOVETECH':
            return '';
        default:
            return state
    }
}