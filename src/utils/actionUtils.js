import * as movieApi from '../services/movieApi';
import *  as tvApi from '../services/tvApi';
import * as peopleApi from '../services/peopleApi';
import { 
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  promptError
} from '../actions/commonActions';
import { mergeEntites } from '../actions/entitiesActions';

export const setFetching = (scope, fetching) => ({
  [`${scope}`]: { isFetching: fetching }
});

export const setError = (scope, error) => ({
  [`${scope}`]: { error: error }
});

export const setListResults = (scope, result) => {
  const { page, totalPages, results } = result;

  return {
    [`${scope}`]: {
      page,
      totalPages,
      items: results,
      updatedAt: Date.now()
    }
  };
};

export const setInfoResult = (result) => {
  const { id } =  result;

  return {
    info: { 
      target: id,
      updatedAt: Date.now() 
    }
  };
};

const getMovieListApi = (topic) => {
  switch (topic.toLowerCase()) {
    case 'discover':
      return movieApi['discoverMovies'];
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
    case 'discover':
      return tvApi['discoverTvs'];
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
  if (topic === 'popular') return peopleApi['fetchPopularPeople'];

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
    if (topic === 'info' || fetchApi === null) {
      throw new Error('The information requested is not available.');
    }

    dispatch(fetchRequest(mediaType, 'list', topic));

    const { data } = await fetchApi(params);

    dispatch(mergeEntites({
      [`${mediaType}`]: data.entities.results
    }));

    dispatch(fetchSuccess(mediaType, 'list', topic, data.result));

  } catch (e) {
    dispatch(fetchFailure(mediaType, 'list', topic, e));
    dispatch(promptError('Error occured during requesting of resources.'));

    if (process.env.NODE_ENV !== 'production') {
      console.error(e);
    }
  }
};