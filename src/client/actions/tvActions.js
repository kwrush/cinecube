import { tvActionTypes as t } from '../constants/actionTypes';
import { mergeEntities } from './entitiesActions';
import {
  popularTvs,
  tvDetail
} from '../services/tvApi'; 
import { camelCaseKey } from '../utils/helpers';

export const fetchPopularTvsRequest = () => ({
  type: t.FETCH_POPULAR_TVS_REQUEST,
  payload: {}
});

export const fetchPopularTvsSuccess = (result) => ({
  type: t.FETCH_POPULAR_TVS_SUCCESS,
  payload: result
});

export const fetchPopularTvsFailure = (e) => ({
  type: t.FETCH_POPULAR_TVS_FAILURE,
  payload: {
    errorMessage: e.message || 'Error occured during the request of resource'
  }
});

export const fetchTvDetailRequest = () => ({
  type: t.FETCH_TV_DETAIL_REQUEST,
  payload: {}
});

export const fetchTvDetailSuccess = (result) => ({
  type: t.FETCH_TV_DETAIL_SUCCESS,
  payload: result
});

export const fetchTvDetailFailure = (e) => ({
  type: t.FETCH_TV_DETAIL_FAILURE,
  payload: {
    errorMessage: e.message || 'Error occured during the request of resource'
  }
});

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchPopularTvs = (params) => async (dispatch) => {
  dispatch(fetchPopularTvsRequest());

  // TODO: check if the api call is needed or data in the state can be used
  try {
    const response = await popularTvs({ ...params });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchPopularTvsSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchPopularTvsFailure(e));
  }
};

/**
 * 
 * @param {number} id tv id 
 * @param {object} params request paramerter
 */
export const fetchTvDetail = (id, params) => async (dispatch) => {
  dispatch(fetchTvDetailRequest());

  try {
    const response = await tvDetail(id, { ...params });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchTvDetailSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchTvDetailFailure(e));
  }
};
