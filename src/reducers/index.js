import { combineReducers } from 'redux-immutable';
import movie from './movie';
import tv from './tv';

const appReducer = combineReducers({
  movie,
  tv
});

export default appReducer;