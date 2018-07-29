import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { tvRoutes } from '../constants/routes';
import Home from '../pages/tv/Home';
import Popular from '../pages/tv/Popular';
import NotFound from '../pages/404';


const TV = props => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path={tvRoutes.popular} component={Popular} />
    <Route path={tvRoutes.discover} component={Popular} />
    <Route path={tvRoutes.topRated} component={Popular} />
    <Route path={tvRoutes.upcoming} component={Popular} />
    <Route path={tvRoutes.inTheatre} component={Popular} />
    <Route path={tvRoutes.info} component={Popular} />
    <Route component={NotFound} />
  </Switch>
);

export default TV;