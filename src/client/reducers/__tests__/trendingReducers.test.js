import tk from 'timekeeper';
import trendingReducer from '../trendingReducer';
import { getTimeStamp } from '../../utils/helpers';
import * as tr from '../../actions/trendingActions';

describe('Trending reducers tests', () => {
  let time = new Date();

  beforeEach(() => {
    tk.freeze(time);
  });

  afterEach(() => {
    tk.reset();
  });

  it('should return initial state when action is not matched', () => {
    expect(trendingReducer(undefined, {})).toEqual({});
  })

  it('should update trendingMovie items in state when FETCH_TRENDING_MOVIE_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 3, 4, 5],
      page: 1,
      totalPages: 10,
      totalResults: 100,
      lastUpdated: getTimeStamp()
    };

    const action = tr.fetchTrendingAllSuccess(res);

    expect(trendingReducer({}, action))
      .toEqual({
        results: [1, 3, 4, 5],
        page: 1,
        totalPages: 10,
        totalResults: 100,
        lastUpdated: getTimeStamp()
      });
  });
});