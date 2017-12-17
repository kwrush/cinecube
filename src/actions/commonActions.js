import { commonActionTypes as actionTypes } from 'constants/actionTypes';

export const loadFailure = (error) => ({
  type: actionTypes.FETCH_FAIL,
  payload: 'Failed to load content.',
  _debug: error  
});

