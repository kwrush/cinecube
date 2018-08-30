import { entitiesActionTypes } from "../constants/actionTypes";

const initialState = {
  movie: {},
  tv: {},
  people: {},
  credits: {}
};

const entitiesReducers = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === entitiesActionTypes.MERGE_ENTITIES) {
    return { ...state, ...payload };
  } else {
    return state;
  }
};

export default entitiesReducers;