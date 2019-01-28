import infoReducer from '../mediaInfoReducers';
import {
  movieActionTypes as mt,
  tvActionTypes as tt,
  peopleActionTypes as pt
} from '../../constants/actionTypes';

describe('Media detail reducers test', () => {
  it('should return the initial state', () => {
    expect(infoReducer(undefined, {})).toEqual({});
  });

  it('should update state correctly when the loading has been done', () => {
    expect(infoReducer({}, {
      type: mt.FETCH_MOVIE_DETAIL_SUCCESS,
      payload: { id: 3 } 
    })).toEqual({
      active: 'movie__3',
      ids: ['movie__3']
    });
  });

  it('should set active to `tv__1` when the loading has been done', () => {
    expect(infoReducer({
      active: 'tv__2',
      ids: ['tv__2', 'movie__3']
    }, {
      type: tt.FETCH_TV_DETAIL_SUCCESS,
      payload: { id: 1 } 
    })).toEqual({
      active: 'tv__1',
      ids: ['tv__2', 'movie__3', 'tv__1']
    });
  });
});