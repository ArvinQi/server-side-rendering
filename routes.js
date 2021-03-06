import React from 'react';
import { Route } from 'react-router';
import { List, Item } from './components';

const Container = (props) => {
    return (
        <div>{props.children}</div>
    )
}
const routes = (
    <Route path="/" component={Container}>
        <Route path="list" component={List} />
        <Route path="item/:id" component={Item} />
    </Route>
)
export default routes;