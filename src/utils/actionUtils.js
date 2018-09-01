import * as movieApi from '../services/movieApi';
import *  as tvApi from '../services/tvApi';
import * as peopleApi from '../services/peopleApi';
import { mergeEntites } from '../actions/entitiesActions';
import actionCreatorFactory from './actionCreatorFactory';
import { promptError } from '../actions/globalActions';

const getMovieListApi = (topic) => {
  switch (topic.toLowerCase()) {
    case 'popular':
      return movieApi['fetchPopularMovies'];
    case 'toprated':
      return movieApi['fetchTopRatedMovies'];
    case 'intheatre':
      return movieApi['fetchInTheatreMovies'];
    case 'upcoming':
      return movieApi['fetchUpcomingMovies'];
    default:
      return null;
  }
};

const getTvListApi = (topic) => {
  switch (topic.toLowerCase()) {
    case 'popular':
      return tvApi['fetchPopularTvs'];
    case 'topRated':
      return tvApi['fetchTopRatedTvs'];
    case 'upcoming':
      return tvApi['fetchOnAirTvs'];
    default:
      return null;
  }
};

const getPeopleListApi = (topic) => {
  if (topic === 'popular') 
    return peopleApi['fetchPopularPeople'];

  return null;
};

const getMediaListApi = (mediaType, topic) => {
  if (mediaType === 'movie') {
    return getMovieListApi(topic);
  } else if (mediaType === 'tv') {
    return getTvListApi(topic);
  } else if (mediaType === 'people') {
    return getPeopleListApi(topic);
  }

  return null;
}

export const fetchMediaList = (mediaType, topic, params) => async (dispatch) => {
 
  const fetchApi = getMediaListApi(mediaType, topic);

  try {
    if (fetchApi === null) {
      throw new Error('The resource requested is not available.');
    }

    dispatch(actionCreatorFactory.mediaListFetchActionFactory('request', mediaType, topic)(params.page));
    
    const { data } = await fetchApi(params);

    dispatch(mergeEntites({
      [`${mediaType}`]: data.entities.results
    }));

    dispatch(actionCreatorFactory.mediaListFetchActionFactory('success', mediaType, topic)(data.result));

  } catch (e) {
    dispatch(actionCreatorFactory.mediaListFetchActionFactory('failure', mediaType, topic)(e));
    dispatch(promptError('Error occured during requesting of resources.'));
  }
};