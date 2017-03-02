const initialState = [];
export default function itemReducer(state = initialState, action) {
    switch(action.type){
        case 'FETCH_ITEM_SUCCESS': return [...action.payload];
        default: return state;
    }
}