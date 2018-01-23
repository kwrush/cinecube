import React from 'react';
import { Route } from 'react-router-dom';

import { rootDomains, movieDomains } from 'constants/domains';

import Home from './Home/index';
import PopularMovies from './PopularMovie/index';
import UpcomingMovies from './UpcomingMovie/index';
import InTheatreMovies from './InTheatreMovie/index';
import TopRatedMovies from './TopRatedMovie/index';

const Movie = (props) => {

  return (
    <div>
      <Route exact path={rootDomains.movie} component={Home} />
      <Route path={movieDomains.popular} component={PopularMovies} />
      <Route path={movieDomains.inTheatre} component={InTheatreMovies} />
      <Route path={movieDomains.upcoming} component={UpcomingMovies} />
      <Route path={movieDomains.topRated} component={TopRatedMovies} />
    </div>
  );
};

export default Movie;