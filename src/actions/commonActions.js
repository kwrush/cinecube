import { commonActionTypes as actionTypes } from 'constants/actionTypes';

export const fetchRequest = () => ({
  type: actionTypes.FETCH_REQUEST,
  payload: {
    isFetching: true
  }
});

export const fetchSuccess = () => ({
  type: actionTypes.FETCH_REQUEST_SUCCESS,
  payload: { 
    isFetching: false,
    updatedAt: Date.now()
  }
});

export const fetchFailure = (error) => ({
  type: actionTypes.FETCH_REQUEST_FAIL,
  payload: {
    isFetching: false,
    error: error,
    errorMessage: 'Failed to load content.'
  }
});