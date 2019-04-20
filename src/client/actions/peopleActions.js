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
  fetchMediaAction
} from '../utils/actionUtils';

export const fetchPopularPeopleRequest = fetchListRequest('popular', 'people')(t);

export const fetchPopularPeopleSuccess = fetchListSuccess('popular', 'people')(t);

export const fetchPopularPeopleFail = fetchListFail('popular', 'people')(t);

export const fetchPeopleDetailRequest = fetchInfoRequest('people')(t);

export const fetchPeopleDetailSuccess = fetchInfoSuccess('people')(t)

export const fetchPeopleDetailFail = fetchInfoFail('people')(t);

//TODO: implement this
const shouldFetchPeople = state => true;
/**
 * 
 * @param {object} params request parameters 
 */
export const fetchPopularPeople = params => (dispatch, getState) => 
 fetchMediaAction({
   shouldDispatchAction: shouldFetchPeople(getState()),
   requestAction: fetchPopularPeopleRequest,
   succesAction: fetchPopularPeopleSuccess,
   failAction: fetchPopularPeopleFail,
   apiRequest: popularPeople,
   params,
   dispatch
 });

/**
 * 
 * @param {number} id people id 
 * @param {object} params request paramerter
 */
export const fetchPeopleDetail= (id, params) => (dispatch, getState) => 
 fetchMediaAction({
   shouldDispatchAction: shouldFetchPeople(getState()),
   requestAction: fetchPeopleDetailRequest,
   succesAction: fetchPeopleDetailSuccess,
   failAction: fetchPeopleDetailFail,
   apiRequest: peopleDetail(id),
   params,
   dispatch
 });
