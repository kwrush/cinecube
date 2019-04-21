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
    expect(infoReducer({}, fetchMovieDetailSuccess({ id: 3 }))).toEqual({
      active: { 'movie__3': getTimeStamp() },
      ids: ['movie__3']
    });
  });

  it('should set active to `tv__1` when the loading has been done', () => {
    expect(infoReducer({
      active: { 'tv__2': getTimeStamp() - 2000 },
      ids: ['tv__2', 'movie__3'],
    }, fetchTvDetailSuccess({ id: 1 }))).toEqual({
      active: { 'tv__1': getTimeStamp() },
      ids: ['tv__2', 'movie__3', 'tv__1'],
    });
  });

  it('should set active to `people__2` when the loading has been done', () => {
    expect(infoReducer({
      active: { 'tv__2': getTimeStamp() - 2000 },
      ids: ['tv__2', 'movie__3'],
    }, fetchPeopleDetailSuccess({ id: 2 }))).toEqual({
      active: { 'people__2': getTimeStamp() },
      ids: ['tv__2', 'movie__3', 'people__2'],
    });
  });
});