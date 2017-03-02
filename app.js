import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
export const Root = (props) => {
    return (
        <div>
            <Provider store={store}>
                <Router history={createBrowserHistory()}>
                    {routes}
                </Router>
            </Provider>
        </div>
    )
}
render(<Root />, document.getElementById('root'));