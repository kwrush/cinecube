const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

class GenreServices extends Servable {

  getMovieGenres (options = {}) {
    const { language } = options;
    return this
      ._makeRequest({ language: language }, this._api.genreMovieList)
      .then(data => normalize(data, schemas.genreResults));
  }

  getTvGenres (options = {}) {
    const { language } = options;
    return this
      ._makeRequest({ language: language }, this._api.genreTvList)
      .then(data => normalize(data, schemas.genreResults));
  }
}

module.exports = GenreServices;