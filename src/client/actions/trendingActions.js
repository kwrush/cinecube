import { trendingActionTypes as t } from '../constants/actionTypes';
import { 
  fetchListRequest, 
  fetchListSuccess,
  fetchListFail
} from '../utils/actionUtils';

export const fetchTrendingAllRequest = fetchListRequest('trending', 'all')(t);

export const fetchTrendingAllSuccess = fetchListSuccess('trending', 'all')(t);

export const fetchTrendingAllFail = fetchListFail('trending', 'all')(t);

export const fetchTrendingMoviesRequest = fetchListRequest('trending', 'movie')(t);

export const fetchTrendingMoviesSuccess = fetchListSuccess('trending', 'movie')(t);

export const fetchTrendingMoviesFail = fetchListFail('trending', 'movie')(t);

export const fetchTrendingTvsRequest = fetchListRequest('trending', 'tv')(t);

export const fetchTrendingTvsSuccess = fetchListSuccess('trending', 'tv')(t);

export const fetchTrendingTvsFail = fetchListFail('trending', 'tv')(t);

export const fetchTrendingPeopleRequest = fetchListRequest('trending', 'people')(t);

export const fetchTrendingPeopleSuccess = fetchListSuccess('trending', 'people')(t);

export const fetchTrendingPeopleFail = fetchListFail('trending', 'people')(t);
