import { combineReducers } from 'redux';
import entities from './entitiesReducer';
import popularMedia from './popularMediaReducers';
import mediaInfo from './mediaInfoReducers';
import search from './searchReducers';
import prompt from './promptReducer';
import api from './apiReducers';

export default combineReducers({
  entities,
  popularMedia,
  mediaInfo,
  search,
  prompt,
  api
});