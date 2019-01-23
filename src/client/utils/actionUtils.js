import * as movieApi from '../services/movieApi';
import * as tvApi from '../services/tvApi';
import * as peopleApi from '../services/peopleApi';

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

export const getMediaListApi = (mediaType, topic) => {
  if (mediaType === 'movie') {
    return getMovieListApi(topic);
  } else if (mediaType === 'tv') {
    return getTvListApi(topic);
  } else if (mediaType === 'people') {
    return getPeopleListApi(topic);
  }

  return null;
};

