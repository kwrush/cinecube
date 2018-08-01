import { combineReducers } from 'redux';
import searchReducers from './searchReducers';
import movieReducers from './movieReducers';
import tvReducers from './tvReducers';
import peopleReducers from './peopleReducers';

const rootReducers = combineReducers({
  movieReducers,
  tvReducers,
  peopleReducers,
  searchReducers
});

export default rootReducers;