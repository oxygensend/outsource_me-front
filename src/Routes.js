import React from 'react';
import { Route, IndexRouteObject } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import MainPage from './components/MainPage';
import SomePage from './components/SomePage';
import SomeOtherPage from './components/SomeOtherPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
    <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="/we" component={SomePage} />
        <Route path="/some/otherpage" component={SomeOtherPage} />
    </Route>
);