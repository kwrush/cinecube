function _setGenres(m, g) {
  let genres = m.genre_ids.map(id => g[id]);
  delete m.genre_ids;
  return {
    ...m,
    genres: genres
  };
}

/**
 * Replaces genre_ids property in media list by the related 
 * genre object {id, genre_text} 
 * @param {array[object]} mediaList 
 * @param {array[object]} genres 
 */
function queryMediaGenres(mediaList, genres) {
  return mediaList.map(m => _setGenres(genres));
}

/**
 * Sets genres for media list contains movie and tv entities
 * @param {array[object]} mediaList 
 * @param {array[object]} movieGenres 
 * @param {array[object]} tvGenres 
 */
function queryMediaGenresByType(mediaList, movieGenres, tvGenres) {
  return mediaList.map(m => {
    let genres = m.media_type === 'movie' ? movieGenres : tvGenres
    return _setGenres(m, genres);
  });
}

/**
 * Moves values in n.entities.results to n.entities[keyName], 
 * and deletes 'results' property
 * @param {object} n normalized results 
 * @param {string} keyName
 */
function mapResultsToKey(n, keyName) {
  if (n.entities && n.entities.results) {
    n.entities[`${keyName}`] = n.entities.results;
    delete n.entities.results;
  }

  return n;
}

/**
 * Sort popularity in descend order
 * @param {array[object]} data 
 */
function sortByPopularity(data) {
  return data.sort((d1, d2) => d2.popularity - d1.popularity);
}

const { pick } = require('lodash');
/**
 * Pick properties in the given array of objects and remove others
 * @param {array[object]} data 
 * @param {array[string]} propsToKeep 
 */
function pickProperty(data, propsToKeep) {
  return data.map(d => pick(d, propsToKeep));
}

module.exports = {
  queryMediaGenres,
  queryMediaGenresByType,
  mapResultsToKey,
  sortByPopularity,
  pickProperty
};