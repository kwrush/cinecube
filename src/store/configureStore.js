import { createStore } from 'redux';
import appReduer from '../reducers/index';

export default configureStore = (initialState) => {
  return createStore(appReduer, initialState);
}