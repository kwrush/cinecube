import { peopleActionTypes as t } from '../constants/actionTypes';
import { mergeEntities } from './entitiesActions';
import {
  popularPeople,
  peopleDetail
} from '../services/peopleApi';
import { camelCaseKey } from '../utils/helpers';

export const fetchPopularPeopleRequest = () => ({
  type: t.FETCH_POPULAR_PEOPLE_REQUEST,
  payload: {}
});

export const fetchPopularPeopleSuccess = (result) => ({
  type: t.FETCH_POPULAR_PEOPLE_SUCCESS,
  payload: result
});

export const fetchPopularPeopleFailure = (e) => ({
  type: t.FETCH_POPULAR_PEOPLE_FAILURE,
  payload: {
    errorMessage: e.message || 'Error occured during the request of resource'
  }
});

export const fetchPeopleDetailRequest = () => ({
  type: t.FETCH_PEOPLE_DETAIL_REQUEST,
  payload: {}
});

export const fetchPeopleDetailSuccess = (result) => ({
  type: t.FETCH_PEOPLE_DETAIL_SUCCESS,
  payload: result
});

export const fetchPeopleDetailFailure = (e) => ({
  type: t.FETCH_PEOPLE_DETAIL_FAILURE,
  payload: {
    errorMessage: e.message || 'Error occured during the request of resource'
  }
});

export const fetchPopularPeople = (params) => async (dispatch) => {
  dispatch(fetchPopularPeopleRequest());

  try {
    const response = await popularPeople({ ...params });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchPopularPeopleSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchPopularPeopleFailure(e));
  }
};

export const fetchPeopleDetail = (id, params) => async (dispatch) => {
  dispatch(fetchPeopleDetailRequest());

  try {
    const response = await peopleDetail(id, { ...params });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchPeopleDetailSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchPeopleDetailFailure(e));
  }
};