import fetch from 'isomorphic-fetch';
export function fetchList() {
    return (dispatch) => {
        return fetch('http://localhost:9999/api/list')
        .then(res => res.json())
        .then(json => dispatch({type: 'FETCH_LIST_SUCCESS', payload: json.data}));
    }
}
export function fetchItem(id) {
    return (dispatch) => {
        if(!id) return Promise.resolve();
        return fetch(`http://localhost:9999/api/item/${id}`)
        .then(res => res.json())
        .then(json => dispatch({type: 'FETCH_TEIM_SUCCESS', payload: json.data}));
    }
}