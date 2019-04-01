import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { PEOPLE_ROUTES } from '../constants/routes';
import {
  PeopleHome,
  PeopleInfo
} from '../pages/people';
import NotFound from '../pages/404';


const People= props => (
  <Switch>
    <Route exact path={PEOPLE_ROUTES.home} component={PeopleHome} />
    <Route path={PEOPLE_ROUTES.detail} component={PeopleInfo} />
    <Route component={NotFound} />
  </Switch>
);

export default People;