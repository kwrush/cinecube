import { merge, mergeWith } from 'lodash';
import { mediaInfoActionTypes } from "../constants/actionTypes";

export const mediaInfo = (state = {}, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case mediaInfoActionTypes.FETCH_MEDIA_INFO_REQUEST:
    case mediaInfoActionTypes.FETCH_MEDIA_INFO_FAILURE:
      return merge({ ...state }, {
        [`${meta.mediaType}`]: { ...payload }
      });
    case mediaInfoActionTypes.FETCH_MEDIA_INFO_SUCCESS:
      const fetchedIds = state.fetched || [];
      const { fetched, ...others } = payload;
      fetchedIds.push(fetched);

      return mergeWith({ ...state }, {
        [`${meta.mediaType}`]: {
          fetched: fetchedIds,
          ...others
        }
      }, (objValue, srcValue) => {
        if (Array.isArray(objValue))
          return objValue.concat(srcValue);
      });
    default:
      return state;
  }
};