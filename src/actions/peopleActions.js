import { normalize } from 'normalizr';
import { peopleActionTypes as actionTypes } from 'constants/actionTypes';
import { peopleResultSchema, peopleProfileSchema } from 'constants/schema';
import { popularPeople, searchPeople, peopleProfile } from 'utils/api';
import { fetchRequest, fetchSuccess, fetchFailure } from './commonActions';

export const fetchPopularPeople = (params) => async (dispatch) => {
  dispatch(fetchRequest(actionTypes.FETCH_POPULAR_PEOPLE_REQUEST));
  try {
    const { data } = await popularPeople(params);
    const normalized = normalize(data.results, peopleResultSchema);
    const payload = {
      pageIndex: data.page,
      totalPages: data.totalPages,
      entities: { ...normalized.entities.people },
      result: normalized.result
    };

    dispatch(fetchSuccess(payload, actionTypes.FETCH_POPULAR_PEOPLE_SUCCESS));

  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

export const fetchPeopleProfile = (id) => async (dispatch) => {
  dispatch(fetchRequest(actionTypes.FETCH_PEOPLE_PROFILE_REQUEST));
  try {
    const { data } = await peopleProfile(id);
    const normalized = normalize(data, peopleProfileSchema);
    const payload = {
      entities: normalized.entities,
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, actionTypes.FETCH_PEOPLE_PROFILE_SUCCESS));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

export const peopleSearch = (params) => async (dispatch) => {
  const { query, ...options } = params;
  dispatch(fetchRequest(actionTypes.SEARCH_PEOPLE_REQUEST));
  
  try {
    const { data } = await searchPeople(query, options);
    const normalized = normalize(data.results, peopleResultSchema);
    const payload = {
      pageIndex: data.page,
      totalPages: data.totalPages,
      entities: { ...normalized.entities.people },
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, actionTypes.SEARCH_PEOPLE_SUCCESS));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};