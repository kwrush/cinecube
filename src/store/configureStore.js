import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import thunkMiddleware from 'redux-thunk';
import appReducer from '../reducers/index';

export default (initialState = Map()) => {
  return createStore(
    appReducer, 
    initialState, 
    applyMiddleware(thunkMiddleware)
  );
};