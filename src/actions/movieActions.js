import * as movieApi from '../services/movieApi';
import { fetchRequest, fetchSuccess, fetchFailure, promptError } from './commonActions';
import { mergeEntites } from './entitiesActions';
import { fetchMediaList } from '../utils/actionUtils';
import { getPageNumber } from '../selectors/commonSelectors';

const fetchMovieList = (topic, params) => fetchMediaList('movie', topic, params);

const fetchMovieInfo = (id) => async (dispatch) => {
  try {

    dispatch(fetchRequest('movie', 'info', 'info'));

    // If error occurs, calling api fails anyway
    const [ info, credits, images, similarMovies ] = await Promise.all([
      movieApi.fetchMovieInfo(id),
      movieApi.fetchMovieCredits(id),
      movieApi.fetchMovieImages(id),
      movieApi.fetchSimilarMovies(id) 
    ]);

    dispatch(mergeEntites({
      credits: { ...credits.entities.cast, ...credits.entities.crew }
    }));

    dispatch(mergeEntites({
      movie: similarMovies.entitis.results
    }));

    dispatch(mergeEntites({
      movie: { 
        [`${info.id}`]: {
          ...info,
          ...images,
          credits: { ...credits.result },
          similar: similarMovies.resut.results
        }
      }
    }));

    dispatch(fetchSuccess('movie', 'info', 'info', info));

  } catch (e) {
    dispatch(fetchFailure('movie', 'info', e));
    dispatch(promptError('Error occured during requesting resources.'));

    if  (process.env.NODE_ENV !== 'production') {
      console.error(e);
    }
  }
};

const shouldFetchMovieList = (state, topic) => {
  //TODO: check if needed to update
  return true;
};

const shouldFetchMovieInfo = (state, id) => {
  return true;
}

export const fetchMovieListIfNeeded = (topic) => (dispatch, getState) => {

  const state = getState();

  if (!shouldFetchMovieList(state, topic)) return;

  const currentPage = getPageNumber(state, 'movie', topic);

  dispatch(fetchMovieList(topic, {
    page: currentPage ? currentPage : 1
  }));
};

export const fetchMovieInfoAction = (id) => async (dispatch, getState) => {
  
  if (!shouldFetchMovieInfo(getState(), id)) return;

  dispatch(fetchMovieInfo(id));
};

