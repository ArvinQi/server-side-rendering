import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ));
    return store;
}