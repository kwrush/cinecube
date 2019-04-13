import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import {
  MOVIE_ROUTES,
  TV_ROUTES,
  PEOPLE_ROUTES,
  SEARCH_ROUTES
} from '../constants/routes';

import Home from '../pages/home/Home';
import Movie from './Movie';
import TV from './TV';
import People from './People';
import Search from './Search'
import NotFound from '../pages/404';

const Main = props => (
  <Switch>
    <Route exact path="/" render={ ()=><Home page={1} /> } />
    <Route path={MOVIE_ROUTES.home} component={Movie} />
    <Route path={TV_ROUTES.home} component={TV} />
    <Route path={PEOPLE_ROUTES.home} component={People} />
    <Route path={SEARCH_ROUTES.multi} component={Search} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
