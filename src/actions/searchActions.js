import { searchActionTypes as actionTypes } from '../constants/actionTypes';
import { 
  searchMulti,
  searchMovies,
  searchTvs,
  searchPeople
} from '../services/searchApi';
import { mergeEntites } from './entitiesActions';

export const searchMultiRequest = (query, page) => ({
  type: actionTypes.SEARCH_MULTI_REQUEST,
  payload: { 
    query,
    page,
    fetching: true 
  }
});

export const updateSearchMultiResult = (query, result) => {

  const { page, ...others } = result;

  return {
    type: actionTypes.UPDATE_SEARCH_MULTI_RESULT,
    payload: {
      query,
      page,
      ...others,
      updatedAt: Date.now(),
      fetching: false
    }
  };
};

export const searchMultiFailure = (query, page) => ({
  type: actionTypes.SEARCH_MULTI_FAILURE,
  payload: {
    query,
    page,
    fetching: false
  }
});

export const fetchSearchMulti = (query, params) => async (dispatch) => {
  if (!query) return;

  try {
    dispatch(searchMultiRequest(query, params.page || 1));
    const { data } = await searchMulti(query, params);
    const { entities, result } = data;

    for (let mediaType in entities) {
      dispatch(mergeEntites({
        [`${mediaType}`]: entities[`${mediaType}`]
      }));
    }

    dispatch(updateSearchMultiResult(query, params.page || 1, result));

  } catch (e) {
    dispatch(searchMultiFailure(query, params.page || 1));
    process.env.NODE_ENV !== 'production' && console.error(e);
  }
};

export const searchMediaRequest = (mediaType, query, page) => ({
  type: actionTypes.SEARCH_MEDIA_REQUEST,
  payload: {
    mediaType, 
    query,
    page,
    fetching: true
  }
});

export const updateSearchMediaResult = (mediaType, query, result) => ({
  type: actionTypes.UPDATE_SEARCH_MULTI_RESULT,
  payload: { 
    mediaType,
    query,
    result 
  }
});

export const searchMediaFailure = (mediaType, query, page) => ({
  type: actionTypes.SEARCH_MEDIA_FAILURE,
  payload: {
    mediaType, 
    query,
    page,
    fetching: false
  }
});

export const searchByMediaType = (mediaType, query, params) => async (dispatch) => {
  if (!query) return;

  try {
    dispatch(searchMediaRequest(mediaType, query, params.page || 1));

    let searchApi = undefined;

    if (mediaType === 'movie') {
      searchApi = searchMovies;
    } else if (mediaType === 'tv') {
      searchApi = searchTvs;
    } else if (mediaType === 'people') {
      searchApi = searchPeople;
    } else {
      throw new Error('The media type requested is not available.');
    }

    const { data } = await searchApi(query, params);
    const { entities, result } = data;

    dispatch(mergeEntites({
      [`${mediaType}`]: { ...entities.results }
    }));

    dispatch(updateSearchMediaResult(mediaType, query, params.page || 1, result));

  } catch (e) {
    dispatch(searchMediaFailure(mediaType, query, params.page || 1));
    process.env.NODE_ENV !== 'production' && console.error(e);
  }
}; 

export const requestAutoSuggestion = (query) => ({
  type: actionTypes.AUTO_SUGGESTION_REQUEST,
  payload: { query }
});

export const updateAutoSuggestion = (suggestions) => ({
  type: actionTypes.UPDATE_AUTO_SUGGESTION,
  payload: { suggestions }
});

export const getAutoSuggestion = (query) => async (dispatch) => {

  let suggestions = undefined;

  try {

    if (query) {

      const { data } = await searchMulti(query);
      const { entities, result } = data;

      for (let mediaType in entities) {
        dispatch(mergeEntites({
          [`${mediaType}`]: entities[`${mediaType}`]
        }));
      }

      suggestions = result;
    }

  } catch (e) {
    process.env.NODE_ENV !== 'production' && console.error(e);
  }

  dispatch(updateAutoSuggestion(suggestions));
};