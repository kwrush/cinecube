import * as tvApi from '../services/tvApi';
import { fetchRequest, fetchSuccess, fetchFailure, promptError } from './commonActions';
import { mergeEntites } from './entitiesActions';
import { fetchMediaList } from '../utils/actionUtils';
import { getPageNumber } from '../selectors/commonSelectors';

const fetchTvList = (topic, params) => fetchMediaList('tv', topic, params);

const fetchTvInfo = (id) => async (dispatch) => {
  try {

    dispatch(fetchRequest('tv', 'info', 'info'));

    // If error occurs, calling api fails anyway
    const [ info, credits, images, similarTvs ] = await Promise.all([
      tvApi.fetchTvInfo(id),
      tvApi.fetchTvCredits(id),
      tvApi.fetchTvImages(id),
      tvApi.fetchSimilarTvs(id) 
    ]);

    dispatch(mergeEntites({
      credits: { ...credits.entities.cast, ...credits.entities.crew }
    }));

    dispatch(mergeEntites({
      tv: similarTvs.entitis.results
    }));

    dispatch(mergeEntites({
      movie: { 
        [`${info.id}`]: {
          ...info,
          ...images,
          credits: { ...credits.result },
          similar: similarTvs.resut.results
        }
      }
    }));

    dispatch(fetchSuccess('tv', 'info', 'info', info));

  } catch (e) {
    dispatch(fetchFailure('tv', 'info', e));
    dispatch(promptError('Error occured during requesting resources.'));

    if  (process.env.NODE_ENV !== 'production') {
      console.error(e);
    }
  }
};

const shouldFetchTvList = (state, topic) => {
  //TODO: check if needed to update
  return true;
};

const shouldFetchTvInfo = (state, id) => {
  return true;
}

export const fetchTvListIfNeeded = (topic) => (dispatch, getState) => {

  const state = getState();

  if (!shouldFetchTvList(state, topic)) return;

  const currentPage = getPageNumber(state, 'tv', topic);

  dispatch(fetchTvList(topic, {
    page: currentPage ? currentPage : 1
  }));
};

export const fetchTvInfoAction = (id) => async (dispatch, getState) => {
  
  if (!shouldFetchTvInfo(getState(), id)) return;

  dispatch(fetchTvInfo(id));
};