import infoReducer from '../mediaInfoReducers';
import {
  movieActionTypes as mt,
  tvActionTypes as tt,
  peopleActionTypes as pt
} from '../../constants/actionTypes';

const initialState = {
  movie: { 
    id: 2
  },
  tv: {},
  people: {}
};

describe('Media detail reducers test', () => {
  it('should return the initial state', () => {
    expect(infoReducer(undefined, {})).toEqual({
      movie: {},
      tv: {},
      people: {}
    });
  });

  it('should update movie id in state when the loading has been done', () => {
    expect(infoReducer(initialState, {
      type: mt.FETCH_MOVIE_DETAIL_SUCCESS,
      payload: { id: 3 } 
    })).toEqual({
      ...initialState,
      movie: { id: 3 }
    });
  });

  it('should update tv id in state when the loading has been done', () => {
    expect(infoReducer(initialState, {
      type: tt.FETCH_TV_DETAIL_SUCCESS,
      payload: { id: 1 } 
    })).toEqual({
      ...initialState,
      tv: { id: 1 }
    });
  });
  
  it('should update people id in state when the loading has been done', () => {
    expect(infoReducer(initialState, {
      type: pt.FETCH_PEOPLE_DETAIL_SUCCESS,
      payload: { id: 1 } 
    })).toEqual({
      ...initialState,
      people: { id: 1 }
    });
  });
});