import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default (initialState = {}) => {
  return createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(thunk)
  );
};