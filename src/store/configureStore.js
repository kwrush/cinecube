import { createStore, applyMiddleware } from 'redux';
import { Record, Map } from 'immutable';
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
 *     discover: {'isFetching': false, result: ['abc', 'efg']},
 *     popular: {'isFetching': false, result: ['abc']},
 *     ....
 *   },
 *   ....
 * }, which avoid duplicating data in the state
 */
const initialState = new Record({
  movie: new Record({
    entities: Map(),
    discover: new Record({
      isFetching: false,
      result: []
    }),
    popular: new Record({
      isFetching: false,
      result: []
    }),
    upcoming: new Record({
      isFetching: false,
      result: []
    }),
    inTheatre: new Record({
      isFetching: false,
      result: []
    }),
    topRated: new Record({
      isFetching: false,
      result: []
    }),
    search: new Record({
      isFetching: false,
      query: '',
      result: []
    })
  }),
  tv: new Record({
    entities: Map(),
    discover: new Record({
      isFetching: false,
      result: []
    }),
    popular: new Record({
      isFetching: false,
      result: []
    }),
    onAir: new Record({
      isFetching: false,
      result: []
    }),
    topRated: new Record({
      isFetching: false,
      result: []
    }),
    search: new Record({
      isFetching: false,
      query: '',
      result: []
    })
  }),
  people: new Record({
    entities: Map(),
    popular: new Record({
      isFetching: false,
      result: []
    }),
    search: new Record({
      isFetching: false,
      query: '',
      result: []
    })
  }),
  favorite: new Record({
    isFetching: false,
    movie: [],
    tv: []
  }),
  searchMulti: new Record({
    isFetching: false,
    query: '',
    result: []
  })
});

export default (initialState = initialState) => {
  return createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));
};