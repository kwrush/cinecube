import * as tvApi from '../services/tvApi';
import { mergeEntites } from './entitiesActions';
import { promptError } from './globalActions';
import { fetchMediaList } from '../utils/actionUtils';
import actionCreatorFactory from '../utils/actionCreatorFactory';

export const fetchTvList = (topic, params) => fetchMediaList('tv', topic, params);

export const fetchTvInfo = (id) => async (dispatch) => {
  try {

    dispatch(actionCreatorFactory.mediaInfoFetchActionFactory('request', 'tv')(id));

    // If error occurs, calling api fails anyway
    const [ info, credits, images, similarTvs ] = await Promise.all([
      tvApi.fetchTvInfo(id),
      tvApi.fetchTvCredits(id),
      tvApi.fetchTvImages(id),
      tvApi.fetchSimilarTvs(id) 
    ]);

    dispatch(mergeEntites({
      credits: { 
        ...credits.data.entities.cast, 
        ...credits.data.entities.crew 
      }
    }));

    dispatch(mergeEntites({
      movie: similarTvs.data.entities.results
    }));


    dispatch(mergeEntites({
      tv: { 
        [`${info.data.id}`]: {
          ...info.data,
          ...images.data,
          credits: { ...credits.data.result },
          similar: similarTvs.data.result.results
        }
      }
    }));

    dispatch(actionCreatorFactory.mediaInfoFetchActionFactory('success', 'tv')(id));

  } catch (e) {
    dispatch(actionCreatorFactory.mediaInfoFetchActionFactory('success', 'tv')(e));
    dispatch(promptError('Error occured during requesting resources.'));
  }
};