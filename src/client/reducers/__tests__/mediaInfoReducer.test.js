import infoReducer from '../mediaInfoReducer';
import tk from 'timekeeper';
import { getTimeStamp } from '../../utils/helpers';
import { fetchMovieDetailSuccess } from '../../actions/movieActions';
import { fetchTvDetailSuccess } from '../../actions/tvActions';
import { fetchPeopleDetailSuccess } from '../../actions/peopleActions';


describe('Media detail reducers test', () => {
  let time = new Date();

  beforeEach(() => {
    tk.freeze(time);
  });

  afterEach(() => {
    tk.reset();
  });

  it('should return the initial state', () => {
    expect(infoReducer(undefined, {})).toEqual({});
  });

  it('should update state correctly when the loading has been done', () => {
    const item = { 'movie__3': getTimeStamp() };
    expect(infoReducer({}, fetchMovieDetailSuccess({ id: 3 }))).toEqual({
      active: item,
      items: [item]
    });
  });

  it('should set active to `tv__1` when the loading has been done', () => {
    const state = {
      active: { 'tv__2': getTimeStamp() - 2000 },
      items: [
        { 'movie_3': getTimeStamp() - 5000 },
        { 'tv__2': getTimeStamp() - 2000 }
      ]
    };

    expect(infoReducer(state, 
      fetchTvDetailSuccess({ id: 1 }))).toEqual({
      active: { 'tv__1': getTimeStamp() },
      items: [
        { 'movie_3': getTimeStamp() - 5000 },
        { 'tv__2': getTimeStamp() - 2000 },
        { 'tv__1': getTimeStamp() }
      ]
    });
  });

  it('should set active to `people__2` when the loading has been done', () => {
    const state = {
      active: { 'tv__2': getTimeStamp() - 2000 },
      items: [
        { 'movie_3': getTimeStamp() - 5000 },
        { 'tv__2': getTimeStamp() - 2000 }
      ]
    };

    expect(infoReducer(state, 
      fetchPeopleDetailSuccess({ id: 2 }))).toEqual({
        active: { 'people__2': getTimeStamp() },
        items: [
          { 'movie_3': getTimeStamp() - 5000 },
          { 'tv__2': getTimeStamp() - 2000 },
          { 'people__2': getTimeStamp() }
        ]
    });
  });
});