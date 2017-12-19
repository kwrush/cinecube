import { createStore, applyMiddleware } from 'redux';
import { fromJS} from 'immutable';
import thunkMiddleware from 'redux-thunk';
import appReducer from '../reducers/index';

/**
 * Define structure of state.
 * The data will be stored in the field entities under the 
 * specific media type by ids. The field of scenes store the 
 * id and fetching status. The fetched data are pushed into
 * entities.
 * For instance, an example of state should be 
 * {
 *   movie: {
 *     entities: {'abc': {...}, 'efg': {...}},
 *     discover: {'isFetching': false, result: {'abc': true, 'efg': true}},
 *     popular: {'isFetching': false, result: {'abc': true}},
 *     ....
 *   },
 *   ....
 * }, which avoid duplicating data in the state
 */

const entityItem = {
  updateAt: null,
  isFetching: false,
  result: {}
};

const initialState = fromJS({
  movie: {
    entities: {},
    discover: entityItem,
    popular: entityItem,
    upcoming: entityItem,
    inTheatre: entityItem,
    topRated: entityItem,
    info: entityItem,
    search: entityItem
  },
  tv: {
    entities: {},
    discover: entityItem,
    popular: entityItem,
    onAir: entityItem,
    topRated: entityItem,
    info: entityItem,
    search: entityItem
  },
  people: {
    entities: {},
    popular: entityItem,
    info: entityItem,
    search: entityItem
  },
  favorite: {
    isFetching: false,
    movie: {},
    tv: {}
  },
  searchMulti: {
    isFetching: false,
    movie: {},
    tv: {},
    people: {}
  }
});

export default (initialState = initialState) => {
  return createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));
};