import { get } from 'lodash';
import { differenceInTime } from '../utils/helpers';

export const setFetching = (scope, fetching) => ({
  [`${scope}`]: { isFetching: fetching }
});

export const setError = (scope, error) => ({
  [`${scope}`]: { error: error }
});

export const setListResults = (scope, result) => {
  const { page, totalPages, results } = result;

  return {
    [`${scope}`]: {
      page,
      totalPages,
      items: results,
      updatedAt: Date.now()
    }
  };
};

export const setInfoResult = (result) => {
  const { id } =  result;

  return {
    info: { 
      target: id,
      updatedAt: Date.now() 
    }
  };
};