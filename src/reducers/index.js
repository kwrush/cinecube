import { combineReducers } from 'redux';
import searchReducers from './searchReducers';
import movieReducers from './movieReducers';
import tvReducers from './tvReducers';
import peopleReducers from './peopleReducers';
import commonReducers from './commonReducers';
import entitiesReducers from './entitiesReducers';

const rootReducers = combineReducers({
  movie: movieReducers,
  tv: tvReducers,
  people: peopleReducers,
  search: searchReducers,
  entities: entitiesReducers,
  global: commonReducers
});

export default rootReducers;