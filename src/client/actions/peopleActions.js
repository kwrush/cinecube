import { peopleActionTypes as t } from '../constants/actionTypes';
import {
  popularPeople,
  peopleDetail
} from '../services/peopleApi'; 
import {
  fetchListRequest,
  fetchListSuccess,
  fetchListFail,
  fetchInfoRequest,
  fetchInfoSuccess,
  fetchInfoFail,
  fetchMediaAction,
  shouldFetchMediaList,
  shouldFetchMediaInfo
} from '../utils/actionUtils';

export const fetchPopularPeopleRequest = fetchListRequest('popular', 'people')(t);

export const fetchPopularPeopleSuccess = fetchListSuccess('popular', 'people')(t);

export const fetchPopularPeopleFail = fetchListFail('popular', 'people')(t);

export const fetchPeopleDetailRequest = fetchInfoRequest('people')(t);

export const fetchPeopleDetailSuccess = fetchInfoSuccess('people')(t)

export const fetchPeopleDetailFail = fetchInfoFail('people')(t);

const shouldFetchPeopleList = (state = {}, fetchType = '', nextPage) => {
  const ft = fetchType.toLowerCase();

  if (ft !== 'popular')
    return false;

  return shouldFetchMediaList(state, ft, 'people', nextPage);
};

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchPopularPeople = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;
  return fetchMediaAction({
    shouldDispatchAction: shouldFetchPeopleList(getState(), 'popular', page),
    requestAction: fetchPopularPeopleRequest,
    succesAction: fetchPopularPeopleSuccess,
    failAction: fetchPopularPeopleFail,
    apiRequest: popularPeople,
    params,
    dispatch
  });
};

const shouldFetchPeopleInfo = (state = {}, id) => shouldFetchMediaInfo(state, 'people', id);
/**
 * 
 * @param {number} id people id 
 * @param {object} params request paramerter
 */
export const fetchPeopleDetail= (id, params) => (dispatch, getState) => 
 fetchMediaAction({
   shouldDispatchAction: shouldFetchPeopleInfo(getState(), id),
   requestAction: fetchPeopleDetailRequest,
   succesAction: fetchPeopleDetailSuccess,
   failAction: fetchPeopleDetailFail,
   apiRequest: peopleDetail(id),
   params,
   dispatch
 });
