import { merge } from 'lodash';
import { entitiesActionTypes } from "../constants/actionTypes";

const initialState = {
  movie: {},
  tv: {},
  people: {},
  credits: {}
};

const entities = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === entitiesActionTypes.MERGE_ENTITIES) {
    return merge(state, payload);
  } else {
    return state;
  }
};

export default entities;