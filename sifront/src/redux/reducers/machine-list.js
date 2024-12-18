const initialState = {};

export default function ListReducer ( state = initialState, action ) {
    switch (action.type){
        case 'ADDLIST':
            const machines = {}
            action.payload.map((item)=> machines[item.id]=item.serial_number)
            return machines;        
        case 'REMOVELIST':
            return {}
        default:
            return state
    }
}