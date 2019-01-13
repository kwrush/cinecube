const Routable = require('./Routable');
const MovieServices = require('../services/MovieServices');
const tmdb = require('../utils/api');

class MovieRoutes extends Routable {

  constructor (router) {
    super(router);
    this._movieServices = new MovieServices(tmdb);
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSON}/movie`;

    this._router.get(
      `${baseURL}/popular`,
      this._getPopularMovies.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)`,
      this._getMovieDetails.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/intro`,
      this._getMovieIntro.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/images`,
      this._getMovieImages.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/videos`,
      this._getMovieVideos.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/credits`,
      this._getMovieCredits.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/similar`,
      this._getSimilarMovies.bind(this)
    );
  }

  _getPopularMovies (req, res, next) {
    this._movieServices.getPopularMovies(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getMovieDetails (req, res, next) {
    const { id } = req.params;
    this._movieServices.getMovieDetails(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getMovieIntro (req, res, next) {
    const { id } = req.params;
    this._movieServices.getMovieIntro(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getMovieCredits (req, res, next) {
    const { id } = req.params;

    this._movieServices.getMovieCredits(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getMovieImages (req, res, next) {
    const { id } = req.params;

    this._movieServices.getMovieImages(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getMovieVideos (req, res, next) {
    const { id } = req.params;

    this._movieServices.getMovieVideos(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getSimilarMovies (req, res, next) {
    const { id } = req.params;

    this._movieServices.getSimilarMovies(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }
}

module.exports = MovieRoutes;