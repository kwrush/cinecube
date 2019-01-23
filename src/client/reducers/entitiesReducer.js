import { merge } from 'lodash';
import { entitiesActionTypes as t } from '../constants/actionTypes';

export default (state = {}, action) => {
  const { type, payload } = action;

  if (type === t.MERGE_ENTITIES) {
    return merge({ ...state }, payload);
  } else {
    return state;
  }
};