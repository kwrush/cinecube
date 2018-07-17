/**
 * complete posters and backdrops url in API response
 */

/**
 * This method overrides posterPath and backdropPath properties
 * in movie/TV object by complete urls which also include
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

  return Object.assign({}, resultObj,
    // tv info object also includes season overviews 
    resultObj.seasons ? {
      seasons: resultObj.seasons.map(season => processPosterUrl(season, posterPrefix, null))
    } : {},
    {
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


