import {
  fetchListRequest,
  fetchInfoRequest,
  fetchListSuccess,
  fetchInfoSuccess,
  fetchListFailure,
  fetchInfoFailure
} from "../actions/fetchMediaActions";

const unavailableActionCreatorWarning = () => 
  console.warn('The action creator requested is not available.');

export const makeMediaListFetchAction = (requestType, mediaType, topic) => {
  switch (requestType.toLowerCase()) {
    case 'request':
      return (page) => fetchListRequest(mediaType, topic, page);
    case 'success':
      return (result) => fetchListSuccess(mediaType, topic, result);
    case 'failure':
      return (page, error) => fetchListFailure(mediaType, topic, page, error);
    default:
      return unavailableActionCreatorWarning;
  }
};

export const makeMediaInfoFetchAction = (requestType, mediaType) => {
  switch (requestType.toLowerCase()) {
    case 'request':
      return (id) => fetchInfoRequest(mediaType, id);
    case 'success':
      return (id) => fetchInfoSuccess(mediaType, id);
    case 'failure':
      return (error) => fetchInfoFailure(mediaType, error);
    default:
      return unavailableActionCreatorWarning;
  }
};