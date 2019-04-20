/**
 * Reducers hanlde api loading flag and error messages, 
 * inspired by https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
 */

import { combineReducers } from 'redux';
import { camelCase } from 'lodash';

const _matchApiAction = (actionType = '') => {

  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(actionType);

  if (!matches) return false;
  
  const [, requestName, requestState] = matches;

  return {
    requestName,
    requestState
  };
}

const notifyError = e => {
  //TODO: implement this
  if (e.response) {
    const status = e.response.status;
    if (status === 401 || status === 404) return true;
  } 

  return false;
}

const fetchingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = _matchApiAction(type);

  if (!matches) return state;

  const { requestName, requestState } = matches;

  return {
    ...state,
    [camelCase(requestName)]: requestState === 'REQUEST'
  };
};

const errorReducer = (state = {}, action) => {
  const { type, payload, error } = action;
  const matches = _matchApiAction(type);

  if (!matches) return state;

  const { requestName, requestState } = matches;
  const failure = requestState === 'FAIL';
  const notify = failure && notifyError(error);

  return {
    ...state,
    [camelCase(requestName)]: {
      error: failure,
      notify,
      message: failure ? payload : '',
    }
  };
};

export default combineReducers({
  fetching: fetchingReducer,
  error: errorReducer
});

