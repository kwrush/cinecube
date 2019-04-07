const Routable = require('./Routable');
const GenreServices = require('../services/GenreServices');
const tmdb = require('../utils/api');

class GenreRoutes extends Routable {

  constructor (router) {
    super(router);
    this._genreServices = new GenreServices(tmdb);
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSION}/genres`;

    this._router.get(
      `${baseURL}/movie`,
      this._getMovieGenres.bind(this)
    );
    
    this._router.get(
      `${baseURL}/tv`,
      this._getTvGenres.bind(this)
    );
  }

  _getMovieGenres(req, res, next) {
    this._genreServices.getMovieGenres(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getTvGenres (req, res, next) {
    this._genreServices.getTvGenres(req.query)
      .then(data => res.send(data))
      .catch(next);
  }
}

module.exports = GenreRoutes;