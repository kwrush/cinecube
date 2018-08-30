import { 
  setFetching, 
  setListResults, 
  setError, 
  setInfoResult 
} from '../utils/actionUtils';
import { commonActionTypes } from '../constants/actionTypes';

const getActionType = (mediaType, fetchType, actionType) => (
  `FETCH_${mediaType.toUpperCase()}_${fetchType.toUpperCase()}_${actionType.toUpperCase()}`
);

export const fetchRequest = (mediaType, fetchType, topic) => ({
  type: getActionType(mediaType, fetchType, 'request'),
  payload: setFetching(topic, true)
});

export const fetchSuccess = (mediaType, fetchType, topic, result) => {

  const data = fetchType.toLowerCase() === 'info'
    ? setInfoResult(result)
    : setListResults(topic, result);

  const fetching =  setFetching(topic, false);
  const error = setError(topic, null);

  return {
    type: getActionType(mediaType, fetchType, 'success'),
    payload: {
      [`${topic}`]: {
        ...data[`${topic}`],
        ...fetching[`${topic}`],
        ...error[`${topic}`]
      }
    }
  };
};

export const fetchFailure = (mediaType, fetchType, topic, error) => {
  const fetching = setFetching(topic, false);
  const errorData = setError(topic, error);

  return {
    type: getActionType(mediaType, fetchType, 'failure'),
    payload: {
      [`${topic}`]: {
        ...fetching[`${topic}`],
        ...errorData[`${topic}`]
      }
    }
  };
};

export const promptError = (errorMessage) => ({
  type: commonActionTypes.PROMPT_ERROR,
  payload: {
    message: errorMessage
  }
});