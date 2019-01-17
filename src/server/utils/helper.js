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

module.exports = {
  queryMediaGenres,
  queryMediaGenresByType
};