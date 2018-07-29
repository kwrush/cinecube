import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import {
  movieRoutes,
  tvRoutes,
  peopleRoutes
} from '../constants/routes';

import Home from '../pages/Home';
import Movie from './Movie';
import TV from './TV';
import People from './People';
import NotFound from '../pages/404';

const Main = props => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path={movieRoutes.home} component={Movie} />
    <Route path={tvRoutes.home} component={TV} />
    <Route path={peopleRoutes.home} component={People} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
