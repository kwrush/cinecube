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
    isFetching: false,
    updatedAt: Date.now(),
    ...data
  }
});

export const fetchFailure = (error) => ({
  type: commonAction.FETCH_REQUEST_FAIL,
  payload: {
    isFetching: false,
    error: error,
    errorMessage: 'Failed to load content.'
  }
});

