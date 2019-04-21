import { combineReducers } from 'redux';
import entities from './entitiesReducer';
import mediaListings from './mediaListReducers';
import mediaInfo from './mediaInfoReducer';
import trending from './trendingReducer';
import search from './searchReducer';
import prompt from './promptReducer';
import api from './apiReducers';

export default combineReducers({
  entities,
  mediaListings,
  mediaInfo,
  trending,
  search,
  prompt,
  api
});