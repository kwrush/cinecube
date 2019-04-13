import React from 'react';
import { 
  Switch,
  Route
 } from 'react-router-dom';

import { SEARCH_ROUTES } from '../constants/routes';
import { 
  SearchMulti,
  SearchMovie,
  SearchTv,
  SearchPeople
} from '../pages/search';
import NotFound from '../pages/404';

console.log(SEARCH_ROUTES.tv)
const Search = props => (
  <Switch>
    <Route exact path={SEARCH_ROUTES.multi} component={SearchMulti} />
    <Route path={SEARCH_ROUTES.movie} component={SearchMovie} />
    <Route path={SEARCH_ROUTES.tv} component={SearchTv} />
    <Route path={SEARCH_ROUTES.people} component={SearchPeople} />
    <Route component={NotFound} />
  </Switch>
);

export default Search;