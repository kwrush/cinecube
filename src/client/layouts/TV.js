import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { TV_ROUTES } from '../constants/routes';
import Home from '../pages/tv/Home';
import Popular from '../pages/tv/Popular';
import NotFound from '../pages/404';


const TV = props => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path={TV_ROUTES.popular} component={Popular} />
    <Route path={TV_ROUTES.topRated} component={Popular} />
    <Route path={TV_ROUTES.upcoming} component={Popular} />
    <Route path={TV_ROUTES.inTheatre} component={Popular} />
    <Route path={TV_ROUTES.info} component={Popular} />
    <Route component={NotFound} />
  </Switch>
);

export default TV;