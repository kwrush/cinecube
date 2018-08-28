import { movieActionTypes as actionTypes } from '../constants/actionTypes';
import * as callApi from '../services/movieApi';
import { fetchRequest, promptError } from './commonActions';
import { mergeEntites } from './entitiesActions';

const fetchMovieRequest = (topic) => fetchRequest('movie', 'list', topic);

const fetchMovieSuccess = (topic, result) => fetchSuccess('movie', 'list', topic, result);

const fetchMovieFailure = (topic, error) => fetchFailure('movie', 'list', error);

const getApi = (topic) => {
  switch (topic.toLowerCase()) {
    case 'discover':
      return callApi['discoverMovies'];
    case 'popular':
      return callApi['fetchPopularMovies'];
    case 'toprated':
      return callApi['fetchTopRatedMovies'];
    case 'intheatre':
      return callApi['fetchInTheatreMovies'];
    case 'upcoming':
      return callApi['fetchUpcomingMovies'];
    default:
      return null;
  }
};

const fetchMovieList = (topic, params) => async (dispatch) => {

  const fetchApi = getApi(topic);

  try {
    if (topic === 'info' || api === null) {
      throw new Error('The information requested is not available.');
    }

    dispatch(fetchMovieRequest(topic));

    const data = await fetchApi(params);

    dispatch(mergeEntites({
      movie: data.entities.results 
    }));
    
    dispatch(fetchMovieSuccess(topic, data.result));
    
  } catch (e) {
    dispatch(fetchMovieFailure(topic, e));
    dispatch(promptError('Error occured during requesting resources.'));

    if  (process.env.NODE_ENV !== 'production') {
      console.error(e);
    }
  }
};

const fetchMovieInfo = (id) => async (dispatch) => {
  try {

    dispatch(fetchMovieRequest('info'));

    // If error occurs, api calling fails anyway
    const [info, credits, images, similarMovies ] = Promise.all([
      callApi.fetchMovieInfo(id),
      callApi.fetchMovieCredits(id),
      callApi.fetchMovieImages(id),
      callApi.fetchSimilarMovies(id) 
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

  } catch (e) {
    dispatch(fetchMovieFailure('info', e));
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

const shouldFetchMovieList = (state, id) => {
  return true;
}

export const fetchMovieListIfNeeded = (topic) => (dispatch, getState) => {

  const state = getState();

  if (!shouldFetchMovieList(state, topic)) return;

  const currentPage = getCurrentPage(state, 'movie', topic);

  return dispatch(fetchMovieList(topic, {
    page: currentPage ? 1 : currentPage + 1
  }));
};

export const fetchMovieInfoAction = (id) => async (dispatch, getState) => {
  
  if (!shouldFetchMovieInfo(getState(), id)) return;

  return dispatch(fetchMovieInfo(id));
};

