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

import Header from '../components/Header/index';
import Footer from '../components/Footer/index';

import Home from '../pages/Home';
import Movie from '../pages/movie/index';
import TV from '../pages/tv/index';
import People from '../pages/people/index';

const Main = props => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path={movieRoutes.home} component={Movie} />
      <Route exact path={tvRoutes.home} component={TV} />
      <Route exact path={peopleRoutes.home} component={People} />
    </Switch>
    <Footer />
  </div>
);

export default Main;
