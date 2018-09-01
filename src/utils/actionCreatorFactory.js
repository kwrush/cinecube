import {
  fetchListRequest,
  fetchInfoRequest,
  fetchListSuccess,
  fetchInfoSuccess,
  fetchListFailure,
  fetchInfoFailure
} from "../actions/fetchMediaActions";

const mediaListFetchActionFactory = (requestType, mediaType, topic) => {
  switch (requestType.toLowerCase()) {
    case 'request':
      return (page) => fetchListRequest(mediaType, topic, page);
    case 'success':
      return (result) => fetchListSuccess(mediaType, topic, result);
    case 'failure':
      return (error) => fetchListFailure(mediaType, topic, error);
    default:
      return null;
  }
};

const mediaInfoFetchActionFactory = (requestType, mediaType) => {
  switch (requestType.toLowerCase()) {
    case 'request':
      return (id) => fetchInfoRequest(mediaType, id);
    case 'success':
      return (id) => fetchInfoSuccess(mediaType, id);
    case 'failure':
      return (error) => fetchInfoFailure(mediaType, error);
    default:
      return null
  }
};

export default {
  mediaListFetchActionFactory,
  mediaInfoFetchActionFactory
};