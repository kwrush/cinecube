import { entitiesActionTypes as actionTypes } from '../constants/actionTypes';

export const mergeEntites = (entities) => {
  return {
    type: actionTypes.MERGE_ENTITIES,
    payload: { ...entities }
  };
};
