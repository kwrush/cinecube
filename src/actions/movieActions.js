import * as movieApi from '../services/movieApi';
import { mergeEntites } from './entitiesActions';
import { promptError } from './globalActions';
import { fetchMediaList } from '../utils/actionUtils';
import actionCreatorFactory from '../utils/actionCreatorFactory';

const fetchMovieList = (topic, params) => fetchMediaList('movie', topic, params);

const fetchMovieInfo = (id) => async (dispatch) => {
  try {

    dispatch(actionCreatorFactory.mediaInfoFetchActionFactory('request', 'movie')(id));

    // If error occurs, calling api fails anyway
    const [ info, credits, images, similarMovies ] = await Promise.all([
      movieApi.fetchMovieInfo(id),
      movieApi.fetchMovieCredits(id),
      movieApi.fetchMovieImages(id),
      movieApi.fetchSimilarMovies(id) 
    ]);

    dispatch(mergeEntites({
      credits: { ...credits.data.entities.cast, ...credits.data.entities.crew }
    }));

    dispatch(mergeEntites({
      movie: similarMovies.data.entitis.results
    }));


    dispatch(mergeEntites({
      movie: { 
        [`${info.data.id}`]: {
          ...info.data,
          ...images.data,
          credits: { ...credits.data.result },
          similar: similarMovies.data.result.results
        }
      }
    }));

    dispatch(actionCreatorFactory.mediaInfoFetchActionFactory('success', 'movie')(id));

  } catch (e) {
    dispatch(actionCreatorFactory.mediaInfoFetchActionFactory('success', 'movie')(e));
    dispatch(promptError('Error occured during requesting resources.'));
  }
};

const shouldFetchMovieList = (state, topic) => {
  return true;
};

const shouldFetchMovieInfo = (state, id) => {
  return true;
}

export const fetchMovieListIfNeeded = (topic, page) => (dispatch, getState) => {

  const state = getState();

  if (!shouldFetchMovieList(state, topic)) return;

  dispatch(fetchMovieList(topic, { page }));
};

export const fetchMovieInfoAction = (id) => async (dispatch, getState) => {
  
  if (!shouldFetchMovieInfo(getState(), id)) return;

  dispatch(fetchMovieInfo(id));
};

