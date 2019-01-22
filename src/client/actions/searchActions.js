import { searchActionTypes as t } from '../constants/actionTypes';
import { camelCaseKey } from '../utils/helpers';
import { 
  searchMulti,
  searchMovies,
  searchTvs,
  searchPeople
} from '../services/searchApi';
import { mergeEntities } from './entitiesActions';

export const searchMediaRequest = (type) => ({
  type: t[`SEARCH_${type.toUpperCase()}_REQUEST`],
  payload: {}
});

export const searchMediaSuccess = (type, result) => ({
  type: t[`SEARCH_${type.toUpperCase()}_SUCCESS`],
  payload: result
});

export const searchMediaFailure = (type, e) => ({
  type: t[`SEARCH_${type.toUpperCase()}_FAILURE`],
  payload: {
    errorMessage: e.message || 'Error occured during the request of resource'
  }
});

export const searchByMediaType = (mediaType, params = {}) => async (dispatch) => {

  let searchApi;

  if (mediaType === 'multi') {
    searchApi = searchMulti;
  } else if (mediaType === 'movie') {
    searchApi = searchMovies;
  } else if (mediaType === 'tv') {
    searchApi = searchTvs;
  } else if (mediaType === 'people') {
    searchApi = searchPeople;
  } else {
    throw new Error('The media type requested is not available.');
  }

  const { query, ...options } = params;

  try {
    dispatch(searchMediaRequest(mediaType));

    const response = await searchApi(query, options);
    const camelized = camelCaseKey(response.data);

    dispatch(mergeEntities(camelized.entities));
    dispatch(searchMediaSuccess(mediaType, camelized.result));

  } catch (e) {
    dispatch(searchMediaFailure(mediaType, e));
  }
}; 