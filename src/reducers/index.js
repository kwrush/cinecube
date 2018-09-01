import { combineReducers } from 'redux';
import entities from './entitiesReducer';
import pagination from './paginationReducer';
import global from './globalReducers';
import mediaInfo from './mediaInfoReducer';
import search from './searchReducer';

export default combineReducers({
  entities,
  pagination,
  mediaInfo,
  global,
  search
});