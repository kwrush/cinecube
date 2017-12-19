import { commonActionTypes as commonAction } from 'constants/actionTypes';

export const fetchRequest = (actionType) => ({
  type: actionType,
  payload: {
    isFetching: true
  }
});

export const fetchSuccess = (data, actionType ) => ({
  type: actionType,
  payload: {
    updatedAt: Date.now(),
    isFetching: false,
    data: data
  }
});

export const fetchFailure = (error) => ({
  type: commonAction.FETCH_FAIL,
  isFetching: false,
  payload: 'Failed to load content.',
  _debug: error  
});

