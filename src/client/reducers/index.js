import { combineReducers } from 'redux';
import entities from './entitiesReducer';
import mediaListing from './mediaListReducers';
import mediaInfo from './mediaInfoReducers';
import trending from './trendingReducer';
import search from './searchReducer';
import prompt from './promptReducer';
import api from './apiReducers';

export default combineReducers({
  entities,
  mediaListing,
  mediaInfo,
  trending,
  search,
  prompt,
  api
});