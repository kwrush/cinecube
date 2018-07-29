import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { movieRoutes } from '../constants/routes';
import Home from '../pages/movie/Home';
import Popular from '../pages/movie/Popular';
import Discover from '../pages/movie/Discover';
import TopRated from '../pages/movie/TopRated';
import Upcoming from '../pages/movie/Upcoming';
import InTheatre from '../pages/movie/InTheatre';
import NotFound from '../pages/404';


const Movie = props => (
  <Switch>
    <Route exact path={movieRoutes.home} component={Home} />
    <Route exact path={movieRoutes.popular} component={Popular} />
    <Route exact path={movieRoutes.discover} component={Discover} />
    <Route exact path={movieRoutes.topRated} component={TopRated} />
    <Route exact path={movieRoutes.upcoming} component={Upcoming} />
    <Route exact path={movieRoutes.inTheatre} component={InTheatre} />
    <Route component={NotFound} />
  </Switch>
);

export default Movie;