const Servable = require('./Servable');

class SearchServices extends Servable {

  searchMovies (options = {}) {
    return this._api.searchMovie(options);
  }

  searchTvs (options = {}) {
    return this._api.searchTv(options);
  }

  searchPeople (options = {}) {
    return this._api.searchPeople(options);
  }

  searchMulti (options = {}) {
    return this._api.searchMulti(options);
  }
}

module.exports = SearchServices;