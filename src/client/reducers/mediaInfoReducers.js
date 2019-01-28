const _matchMediaType = (actionType = '') => {
  const matches = /(.*)_(MOVIE|TV|PEOPLE)_DETAIL_SUCCESS/.exec(actionType);

  if (!matches) return false;

  const [, , mediaType] = matches;
  
  return mediaType.toLowerCase();
};

export default (state = {}, action) => {
  const { type, payload } = action;
  const mediaType = _matchMediaType(type);

  if (!mediaType) return state;
  const key = `${mediaType}__${payload.id}`;
  const ids = state.ids ? state.ids.concat(key) : [key];

  return {
    ...state,
    active: key,
    ids: ids
  };
};