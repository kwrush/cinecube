/**
 * complete image urls in API response
 */
 
'use strict';

/**
 * This method overrides posterPath and backdropPath properties
 * in movie/TV object by predefined complete urls which also includes
 * multiple sizes
 * e.g.
 *  {
 *    ...
 *    posterPath: {
 *      s: 'https://images.tmdb.org/t/p/w200/sample.jpeg',
 *      m: 'https://images.tmdb.org/t/p/w400/sample.jpeg',
 *      l: 'https://images.tmdb.org/t/p/w600/sample.jpeg',
 *      orig: 'https://images.tmdb.org/t/p/original/sample.jpeg',
 *    }
 *  }
 */ 
const processPosterUrl = (resultObj, posterPrefix, backdropPrefix) => {
  const newPosterPath = {};
  const newBackdropPath = {};
  
  for (let size in posterPrefix) {
    newPosterPath[size] = resultObj.posterPath ? `${posterPrefix[size]}${resultObj.posterPath}` : null;
  }
  
  for (let size in backdropPrefix) {
    newBackdropPath[size] = resultObj.backdropPath ? `${backdropPrefix[size]}${resultObj.backdropPath}` : null;
  }
  
  return Object.assign({}, resultObj, {
    posterPath: newPosterPath,
    backdropPath: newBackdropPath
  });
};

module.exports = (options) => {
  const root = (options && options.root) || {};
  const posterPrefix = (options && options.posterUrlPrefix) || {};
  const backdropPrefix = (options && options.backdropUrlPrefix) || {};
  
  if (typeof root !== 'object') throw new TypeError('Invalid value for options.root');
  
  if (Array.isArray(root)) {
    
    return root.map(result => processPosterUrl(result, posterPrefix, backdropPrefix));
  }
  
  return processPosterUrl(root, posterPrefix, backdropPrefix);
};


