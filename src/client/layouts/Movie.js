import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { MOVIE_ROUTES } from '../constants/routes';
import { 
  MovieHome, 
  MovieInfo
} from '../pages/movie';
import NotFound from '../pages/404';


const Movie = props => (
  <Switch>
    <Route exact path={MOVIE_ROUTES.home} component={MovieHome} />
    <Route path={MOVIE_ROUTES.detail} component={MovieInfo} />
    <Route component={NotFound} />
  </Switch>
);

export default Movie;