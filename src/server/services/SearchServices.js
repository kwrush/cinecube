const { normalize } = require('normalizr');
const schemas = require('../utils/schema');
const Servable = require('./Servable');
const { mapResultsToKey } = require('../utils/helper');

// Change {media_type: 'person'} to 'people' to unify api results,
// because other api calls or responses normally use 'people'
const _personToPeople = (data) => {
  data.results = data.results.map(r => {
    if (r.media_type && r.media_type === 'person') {
      r.media_type = 'people';
    }
    return r;
  });

  return data;
}

class SearchServices extends Servable {

  searchMovies (options = {}) {
    return this._api
      .searchMovie(options)
      .then(data => mapResultsToKey(
        normalize(data, schemas.mediaResults),
        'movie'
      ));
  }

  searchTvs (options = {}) {
    return this._api
      .searchTv(options)
      .then(data => mapResultsToKey(
        normalize(data, schemas.mediaResults),
        'tv'
      ));
  }

  searchPeople (options = {}) {
    return this._api
      .searchPeople(options)
      .then(data => mapResultsToKey(
        normalize(data, schemas.mediaResults),
        'people'
      ));
  }

  searchMulti (options = {}) {
    return this._api
      .searchMulti(options)
      .then(data => 
        normalize(_personToPeople(data), schemas.multiResults));
  }
}

module.exports = SearchServices;