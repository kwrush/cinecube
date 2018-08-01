import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { MOVIE_ROUTES } from '../constants/routes';
import Home from '../pages/movie/Home';
import Popular from '../pages/movie/Popular';
import TopRated from '../pages/movie/TopRated';
import Upcoming from '../pages/movie/Upcoming';
import InTheatre from '../pages/movie/InTheatre';
import NotFound from '../pages/404';


const Movie = props => (
  <Switch>
    <Route exact path={MOVIE_ROUTES.home} component={Home} />
    <Route exact path={MOVIE_ROUTES.popular} component={Popular} />
    <Route exact path={MOVIE_ROUTES.topRated} component={TopRated} />
    <Route exact path={MOVIE_ROUTES.upcoming} component={Upcoming} />
    <Route exact path={MOVIE_ROUTES.inTheatre} component={InTheatre} />
    <Route component={NotFound} />
  </Switch>
);

export default Movie;