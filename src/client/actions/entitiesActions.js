import { entitiesActionTypes as t } from '../constants/actionTypes';

export const mergeEntities = entities => ({
  type: t.MERGE_ENTITIES,
  payload: entities 
});