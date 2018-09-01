import { mediaListActionTypes } from "../constants/actionTypes";

const pagination = (state = {}, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case mediaListActionTypes.FETCH_MEDIA_LIST_REQUEST:
    case mediaListActionTypes.FETCH_MEDIA_LIST_FAILURE:
      return {
        [`${meta.mediaType}`]: {
          [`${meta.topic}`]: { [`${payload.page}`]: { ...payload } }
        }
      };
    case mediaListActionTypes.FETCH_MEDIA_LIST_SUCCESS:

      const { results, page, updatedAt, ...others } = payload;

      return {
        [`${meta.mediaType}`]: {
          [`${meta.topic}`]: { 
            [`${page}`]: { 
              items: results,
              page,
              updatedAt
            },
            ...others 
          }
        }
      };
    default:
      return state;
  }
};

export default pagination;