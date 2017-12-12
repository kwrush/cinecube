/**
 * Categorize multi search results by media type.
 * For instance
 * { 
 *   ...
 *   results: {
 *     movie:  [...],
 *     tv:     [...], 
 *     person: [...],
 *   }
 * }
 */
 
'use strict';

const tmdbPosters  = require('../middlewares/tmdbPosters');
const tmdbProfiles = require('../middlewares/tmdbProfiles');

module.exports = (options) => {
  const root = (options && options.root) || [];
  const posterPrefix = (options && options.posterUrlPrefix) || {};
  const backdropPrefix = (options && options.backdropUrlPrefix) || {};
  const profilePrefix = (options && options.profileUrlPrefix) || {};
  const results = {
    movie: [],
    tv: [],
    person: []
  };
  
  root.map(rs => results[rs.mediaType].push(rs));

  return {
    movie: results.movie.length > 0 ? tmdbPosters({
      root: results.movie,
      posterUrlPrefix: posterPrefix,
      backdropUrlPrefix: backdropPrefix
    }) : [],
    tv: results.tv.length > 0 ? tmdbPosters({
      root: results.tv,
      posterUrlPrefix: posterPrefix,
      backdropUrlPrefix: backdropPrefix
    }) : [],
    person: results.person.length > 0 ? tmdbProfiles({
      root: results.person,
      profileUrlPrefix: profilePrefix
    }) : []
  };
}