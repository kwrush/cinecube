import {
  fetchMovieInfo,
  fetchMovieCredits,
  fetchMovieImages,
  fetchSimilarMovies
} from '../services/movieApi';
import { mergeEntites } from './entitiesActions';
import { promptError } from './globalActions';
import { fetchMediaList } from './fetchMediaActions';
import { makeMediaInfoFetchAction } from '../utils/actionCreatorFactory';

export const fetchMovieList = (topic, params) => fetchMediaList('movie', topic, params);

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {

    dispatch(makeMediaInfoFetchAction('request', 'movie')(id));

    // If error occurs, calling api fails anyway
    const [ info, credits, images, similarMovies ] = await Promise.all([
      fetchMovieInfo(id),
      fetchMovieCredits(id),
      fetchMovieImages(id),
      fetchSimilarMovies(id) 
    ]);

    dispatch(mergeEntites({
      credits: { 
        ...credits.data.entities.cast, 
        ...credits.data.entities.crew 
      }
    }));

    dispatch(mergeEntites({
      movie: similarMovies.data.entities.results
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

    dispatch(makeMediaInfoFetchAction('success', 'movie')(id));

  } catch (e) {
    dispatch(makeMediaInfoFetchAction('failure', 'movie')(e));
    dispatch(promptError('Error occured during requesting resources.'));
  }
};
