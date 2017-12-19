import { createStore, applyMiddleware } from 'redux';
import { fromJS} from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { movieEntity, tvEntity, peopleEntity } from 'constants/storeConstants';
import appReducer from '../reducers/index';

const intialState = fromJS({
  movie: movieEntity,
  tv: tvEntity,
  people: peopleEntity
});

export default (initialState = initialState) => {
  return createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));
};