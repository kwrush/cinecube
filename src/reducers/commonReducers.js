import { commonActionTypes } from '../constants/stateModels';

export const fetchingReducer = (state = {}, action) => {
  const { type, payload } = action;

  if (type === commonActionTypes.SET_FETCHING) {
    return { ...state, isFetching: payload.fetching }
  } else {
    return state;
  }
};

export const fetchingErrorReducer = (state = {}, action) => {
  const { type, payload } = action;
  if (type === commonActionTypes.SET_FETCHING_ERROR) {
    return { ...state, error: payload.error };
  } else {
    return state;
  }
};

export const mediaInfoReducer = (state = {}, action) => {
  const { type, payload } = action;

  if (type === commonAtionTypes.SET_MEDIA_INFO) {   
    return { ...state, 
      mediaId: payload.id,
      mediaType: payload.mediaType
    };
  } else {
    return state;
  }
};

export const entitiesReducer = (state = {}, action) => {
  const { type, payload } = action;

  if (type === commonActionTypes.SET_MEDIA_ENTITIES) {
    return Object.assign({},
      state,
      {
        [`${payload.scope}`]: payload.entities
      }
    );
  } else {
    return state;
  }
};

