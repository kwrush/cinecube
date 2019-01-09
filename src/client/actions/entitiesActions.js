import { entitiesActionTypes as actionTypes } from '../constants/actionTypes';

export const mergeEntites = (entities) => ({
  type: actionTypes.MERGE_ENTITIES,
  payload: { ...entities }
});
