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
  
  const activeItem = { [key]: lastUpdated };
  const items = {
    ...state.items,
    ...activeItem
  };

  return {
    ...state,
    active: activeItem,
    items
  };
};