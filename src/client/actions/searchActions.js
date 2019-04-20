import { searchActionTypes as t } from '../constants/actionTypes';
import { 
  searchMulti,
  searchMovies,
  searchTvs,
  searchPeople
} from '../services/searchApi';
import { searchRequest, searchSuccess, searchFail, fetchMediaAction } from '../utils/actionUtils';

export const searchMediaRequest = (mediaType, query) => searchRequest(mediaType, query)(t);

export const searchMediaSuccess = (mediaType, query) => searchSuccess(mediaType, query)(t);

export const searchMediaFail = mediaType => searchFail(mediaType)(t);

// TODO: implement this
const shouldSearch = state => true;

export const searchByMediaType = (mediaType, params = {}) => (dispatch, getState) => {

  let searchApi = () => {};

  if (mediaType === 'multi') {
    searchApi = searchMulti;
  } else if (mediaType === 'movie') {
    searchApi = searchMovies;
  } else if (mediaType === 'tv') {
    searchApi = searchTvs;
  } else if (mediaType === 'people') {
    searchApi = searchPeople;
  }

  const { query, ...rest } = params;

  return fetchMediaAction({
    shouldDispatchAction: shouldSearch(getState()),
    apiRequest: searchApi(query),
    requestAction: searchMediaRequest(mediaType, query),
    succesAction: searchMediaSuccess(mediaType, query),
    failAction: searchMediaFail(mediaType),
    params: rest,
    dispatch
  });
}; 