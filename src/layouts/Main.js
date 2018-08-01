import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import {
  MOVIE_ROUTES,
  TV_ROUTES,
  PEOPLE_ROUTES
} from '../constants/routes';

import Home from '../pages/Home';
import Movie from './Movie';
import TV from './TV';
import People from './People';
import NotFound from '../pages/404';

const Main = props => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path={MOVIE_ROUTES.home} component={Movie} />
    <Route path={TV_ROUTES.home} component={TV} />
    <Route path={PEOPLE_ROUTES.home} component={People} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
