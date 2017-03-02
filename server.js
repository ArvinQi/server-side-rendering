import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { RouterContext, match} from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import { fetchList, fetchItem } from './actions';
import configureStore from './store';
import { List, Item } from './components'
// import { Root } from './app'

const app = express();

function renderFullPage(html, initialState) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <div id="root">
                    <div>${html}</div>
                </div>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    `;
}

app.use(express.static(__dirname + '/static'))
app.use((req, res) => {
    match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
        if(err) {
            res.status(500).end(`Internal Server Error ${err}`);
        }else if(redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        }else if(renderProps) {
            const store = configureStore();
            const state = store.getState();
            Promise.all([
                store.dispatch(fetchList()),
                store.dispatch(fetchItem(renderProps.params.id))
            ])
            .then(() => {
                const html = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps}/>
                    </Provider>
                );
                // console.log(state)
                res.end(renderFullPage(html, store.getState()));
            }).catch(err => console.log(err));
        }else if(req.url.match(/\/api\//)) {
            console.log('geting data')
            if(req.url.match(/\/api\/list/)) {
                res.status(200).end(JSON.stringify({
                    data: [
                        {
                            id: 1,
                            name: "arvin1"
                        },
                        {
                            id: 2,
                            name: "arvin2"
                        },
                        {
                            id: 3,
                            name: "arvin3"
                        },
                        {
                            id: 4,
                            name: "arvin4"
                        }
                    ]
                }))
            }else if(req.url.match(/\/api\/list/)) {
                res.status(200).end(JSON.stringify({
                    data: [
                        {
                            id: 1,
                            name: "arvin1"
                        },
                        {
                            id: 2,
                            name: "arvin2"
                        },
                        {
                            id: 3,
                            name: "arvin3"
                        },
                        {
                            id: 4,
                            name: "arvin4"
                        }
                    ]
                }))
            }else {
                res.status(304).end(JSON.stringify({err:{msg: 'API NOT FOUND'}}))
            }
        }else if(req.url.match(/\/static\//)) {
            res.sendfile(__dirname + req.url);
        }else {
            res.status(404).end('Not found');
        }
    });
});
app.listen(9999)