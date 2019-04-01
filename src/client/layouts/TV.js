import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { TV_ROUTES } from '../constants/routes';
import {
  TvHome,
  TvInfo
} from '../pages/tv';
import NotFound from '../pages/404';


const TV = props => (
  <Switch>
    <Route exact path={TV_ROUTES.home} component={TvHome} />
    <Route path={TV_ROUTES.detail} component={TvInfo} />
    <Route component={NotFound} />
  </Switch>
);

export default TV;