import { fromJS, Map } from 'immutable';
import { getPopularMovies } from '../movieSelectors';

describe('selector unit test', () => {
  const res = {
    entities: {'1': {id: '1', name: 'Media1', date: '2011'}, '2': {id: '2', name: 'Media2', date: '2009'}},
    result: {'1': '1', '2': '2'}
  };

  const initialState = fromJS({
    'movie': {
      'entities': res.entities,
      'popular': {
        'result': {}
      }
    }
  });

  const reducer = (state = Map(), action) => {
    const data = action.payload;
    switch (action.type) {
      case 'result':
        return state.setIn(['movie', 'popular', 'result'], fromJS(data.result));
      case 'entities':
        return state.mergeDeep({
          'movie': {
            'entities': data.entities,
          }
        });
      default:
        return state;
    }
  }

  const fetchAction = (type, res) => ({
    type: type,
    payload: {
      entities: res.entities,
      result: res.result
    }
  });
  
  it('should get popular movies and reuse memoization', () => {
      let state = reducer(initialState, fetchAction('result', res));
      expect(getPopularMovies(state).equals(fromJS(res.entities))).toBeTruthy();
      state = reducer(state, fetchAction('entities', res));
      expect(getPopularMovies(state).equals(fromJS(res.entities))).toBeTruthy();
      expect(getPopularMovies.recomputations()).toBe(1);

      res.result = {'1': '1'};
      state = reducer(state, fetchAction('result', res));
      expect(getPopularMovies(state).equals(fromJS({'1': res.entities['1']}))).toBeTruthy();
      expect(getPopularMovies.recomputations()).toBe(2);
  });
});