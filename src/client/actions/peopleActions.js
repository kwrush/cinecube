import { peopleActionTypes as t } from '../constants/actionTypes';
import { mergeEntities } from './entitiesActions';
import {
  popularPeople,
  peopleDetail
} from '../services/peopleApi'; 
import { camelCaseKey } from '../utils/helpers';
import {
  fetchListRequest,
  fetchListSuccess,
  fetchListFail,
  fetchInfoRequest,
  fetchInfoSuccess,
  fetchInfoFail,
  fetchMediaAction
} from '../utils/actionUtils';

export const fetchPopularPeopleRequest = fetchListRequest('popular', 'people')(t);

export const fetchPopularPeopleSuccess = fetchListSuccess('popular', 'people')(t);

export const fetchPopularPeopleFail = fetchListFail('popular', 'people')(t);

export const fetchPeopleDetailRequest = fetchInfoRequest('people')(t);

export const fetchPeopleDetailSuccess = fetchInfoSuccess('people')(t)

export const fetchPeopleDetailFail = fetchInfoFail('people')(t);

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchPopularPeople = (params) => async(dispatch, getState) => {
  dispatch(fetchPopularPeopleRequest);

  // TODO: check if the api call is needed or data in the state can be used
  // TODO: check status to handle different response
  try {
    const response = await popularPeople({
      ...params
    });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchPopularPeopleSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchPopularPeopleFail(e));
  }
};

/**
 * 
 * @param {number} id people id 
 * @param {object} params request paramerter
 */
export const fetchPeopleDetail = (id, params) => async (dispatch) => {
  dispatch(fetchPeopleDetailRequest);

  try {
    const response = await peopleDetail(id, { ...params });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchPeopleDetailSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchPeopleDetailFail(e));
  }
};
