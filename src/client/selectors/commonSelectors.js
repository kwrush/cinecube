import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getPosterUrl, getProfileUrl } from '../utils/imageUtils';
import { getFullYear } from '../utils/helpers';

export const getEntitiesByType = (state, mediaType) => 
  get(state, ['entities', mediaType]);

export const getTopicItemsByPage = (state, mediaType, topic, page) => 
  get(state, ['pagination', mediaType, topic, page, 'items']);

export const getTopicUpdatedTimeByPage = (state, mediaType, topic, page) => 
  get(state, ['pagination', mediaType, topic, page, 'updatedAt']);

export const getFetchingStatusByPage = (state, mediaType, topic, page) => 
  get(state, ['pagination', mediaType, topic, page, 'isFetching']);

export const getTotalPagesByTopic = (state, mediaType, topic) => 
  get(state, ['pagination', mediaType, topic, 'totalPages']);

export const getActiveInfoByType = (state, mediaType) => 
  get(state, ['mediaInfo', mediaType, 'active']);

export const getFetchedInfoByType = (state, mediaType) => 
  get(state, ['mediaInfo', mediaType, 'fetched']);

export const getSuggestionResults = (state) => 
  get(state, ['search', 'suggestion', 'results']);

export const getSearchSuggestion = createSelector(
  getSuggestionResults,
  (state) => get(state, 'entities'),
  (results, entities) => {
    if (!results) return [];

    return results.slice(0, 10).map(res => {
      let { id, schema } = res;

      const entry = get(entities, [`${schema}`, `${id}`]);

      const imgPath = entry.posterPath 
        ? getPosterUrl(entry.posterPath, 's')
        : entry.profilePath ? getProfileUrl(entry.profilePath, 's')
        : '';

      const title = entry.title 
        ? entry.releaseDate 
          ? `${entry.title}(${getFullYear(entry.releaseDate)})`
          : `${entry.title}(${getFullYear(entry.firstAirDate)})`
        : entry.name;
  
      return {
        id: id,
        imgUrl: imgPath,
        title: title,
        url: `${schema}/${id}`  
      };
    });
  }
);