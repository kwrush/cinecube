import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from '../reducers/index';

export default (initialState = {}) => {
  return createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));
};