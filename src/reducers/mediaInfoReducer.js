import { mediaInfoActionTypes } from "../constants/actionTypes";

const mediaInfo = (state = {}, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case mediaInfoActionTypes.FETCH_MEDIA_INFO_REQUEST:
    case mediaInfoActionTypes.FETCH_MEDIA_INFO_FAILURE:
      return {
        [`${meta.mediaType}`]: { ...payload }
      }
    case mediaInfoActionTypes.FETCH_MEDIA_INFO_SUCCESS:
      const fetchedIds = state.fetched || [];
      const { fetched, ...others } = payload;
      fetchedIds.push(fetched);

      return {
        [`${meta.mediaType}`]: {
          fetched: fetchedIds,
          ...others
        }
      }
    default:
      return state;
  }
};

export default mediaInfo;