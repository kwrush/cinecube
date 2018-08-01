import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { PEOPLE_ROUTES } from '../constants/routes';
import Home from '../pages/people/Home';
import Popular from '../pages/people/Popular';
import NotFound from '../pages/404';


const People= props => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path={PEOPLE_ROUTES.popular} component={Popular} />
    <Route path={PEOPLE_ROUTES.discover} component={Popular} />
    <Route path={PEOPLE_ROUTES.topRated} component={Popular} />
    <Route path={PEOPLE_ROUTES.upcoming} component={Popular} />
    <Route path={PEOPLE_ROUTES.inTheatre} component={Popular} />
    <Route path={PEOPLE_ROUTES.info} component={Popular} />
    <Route component={NotFound} />
  </Switch>
);

export default People;