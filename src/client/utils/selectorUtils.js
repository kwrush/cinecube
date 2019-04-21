import { get, camelCase } from 'lodash';
import {
  getMovieEntities,
  getTvEntities,
  getPeopleEntities,
  getEntities
} from '../selectors/entitiesSelectors';

const _isValidType = (entityType = '', mediaType = '') => {
  const et = entityType.toLowerCase();
  const mt = mediaType.toLowerCase();
  if (et === 'popular' || et === 'trending') 
    return ['movie', 'tv', 'people'].indexOf(mt) >= 0;
  if (et === 'toprated')
    return ['movie', 'tv'].indexOf(mt) >= 0;
  if (et === 'upcoming' || et === 'nowplaying')
    return mt === 'movie';
  if (et === 'onair')
    return mt === 'tv';
};

export const createEntitiesSelector = (mediaType) => {
  const type = mediaType.toLowerCase();

  let entitiesSelector;

  if (type === 'movie') {
    entitiesSelector = getMovieEntities;
  } else if (type === 'tv') {
    entitiesSelector = getTvEntities;
  } else if (type === 'people') {
    entitiesSelector = getPeopleEntities;
  } else if (['multi', 'all'].indexOf(type) >= 0) {
    entitiesSelector = getEntities;
  }

  return entitiesSelector;
};

export const createMediaListPath = (entityType, mediaType, propName) => {
  if (!_isValidType(entityType, mediaType)) 
    throw new Error(`Invalid media type ${mediaType} for entity ${entityType}`);
  
  return `mediaListings.${camelCase(entityType + '_' + mediaType)}.${propName}`;
};

export const getEntitiesByIds = (entities, mediaType, ids) => {
  if (Array.isArray(ids)) {
    return ids.map(id => {
      const entity = get(entities, id);
      if (entity && !entity.mediaType) {
        entity.mediaType = mediaType.toLowerCase();
      }

      return entity;
    });
  }

  return undefined;
}

export const getEntitiesBySchema = (entities, results) => {
  if (Array.isArray(results)) {
    return results.map(res => {
      if (typeof res === 'object') {
        const { schema, id } = res;
        return get(entities, `${schema}.${id}`);
      } else {
        return get(entities, res);
      }
    })
  }
  return  undefined;
};



