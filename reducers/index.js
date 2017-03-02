import listReducer from './list';
import itemReducer from './item';

export default function rootReducer(state = {}, action) {
    console.log('state', state)
    return {
        list: listReducer(state.list, action),
        item: itemReducer(state.item, action)
    }
}