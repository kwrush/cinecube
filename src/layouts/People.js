import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { peopleRoutes } from '../constants/routes';
import Home from '../pages/people/Home';
import Popular from '../pages/people/Popular';
import NotFound from '../pages/404';


const People= props => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path={peopleRoutes.popular} component={Popular} />
    <Route path={peopleRoutes.discover} component={Popular} />
    <Route path={peopleRoutes.topRated} component={Popular} />
    <Route path={peopleRoutes.upcoming} component={Popular} />
    <Route path={peopleRoutes.inTheatre} component={Popular} />
    <Route path={peopleRoutes.info} component={Popular} />
    <Route component={NotFound} />
  </Switch>
);

export default People;