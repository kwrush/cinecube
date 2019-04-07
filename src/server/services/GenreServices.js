const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

class GenreServices extends Servable {

  async getMovieGenres (options = {}) {
    const { language } = options;
    const data = await this
      ._makeRequest({ language }, this._api.genreMovieList);
    return normalize(data, schemas.genreResults);
  }

  async getTvGenres (options = {}) {
    const { language } = options;
    const data = await this
      ._makeRequest({ language }, this._api.genreTvList);
    return normalize(data, schemas.genreResults);
  }
}

module.exports = GenreServices;