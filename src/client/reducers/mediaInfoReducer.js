import { uniqueConcat } from "../utils/helpers";

const _matchMediaType = (actionType = '') => {
  const matches = /FETCH_(MOVIE|TV|PEOPLE)_DETAIL_SUCCESS/.exec(actionType);

  if (!matches) return false;

  const [, mediaType] = matches;
  
  return mediaType.toLowerCase();
};

export default (state = {}, action) => {
  const { type, payload, lastUpdated } = action;
  const mediaType = _matchMediaType(type);

  if (!mediaType) return state;
  const key = `${mediaType}__${payload.id}`;
  
  const ids = state.ids ? uniqueConcat(state.ids, [key]) : [key];

  return {
    ...state,
    active: {
      [key]: lastUpdated
    },
    ids: ids,
  };
};