const Routable = require('./Routable');
const MovieServices = require('../services/MovieServices');
const tmdb = require('../utils/api');

class MovieRoutes extends Routable {

  constructor (router) {
    super(router);
    this._services = new MovieServices(tmdb);
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSION}/movie`;

    this._router.get(
      `${baseURL}/popular`,
      this._getPopularMovies.bind(this)
    );

    this._router.get(
      `${baseURL}/upcoming`,
      this._getUpcomingMovies.bind(this)
    );

    this._router.get(
      `${baseURL}/now-playing`,
      this._getNowPlayingMovies.bind(this)
    );

    this._router.get(
      `${baseURL}/top-rated`,
      this._getTopRatedMovies.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)`,
      this._getMovie.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/info`,
      this._getMovieInfo.bind(this)
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

    this._router.get(
      `${baseURL}/:id(\\d+)/recommendation`,
      this._getRecommendMovies.bind(this)
    );
  }

  _getPopularMovies (req, res, next) {
    this._services.getPopularMovies(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getUpcomingMovies (req, res, next) {
    this._services.getUpcomingMovies(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getNowPlayingMovies (req, res, next) {
    this._services.getNowPlayingMovies(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getTopRatedMovies (req, res, next) {
    this._services.getTopRatedMovies(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getMovie (req, res, next) {
    const { id } = req.params;
    this._services.getMovie(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getMovieInfo (req, res, next) {
    const { id } = req.params;
    this._services.getMovieInfo(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getMovieCredits (req, res, next) {
    const { id } = req.params;

    this._services.getMovieCredits(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getMovieImages (req, res, next) {
    const { id } = req.params;

    this._services.getMovieImages(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getMovieVideos (req, res, next) {
    const { id } = req.params;

    this._services.getMovieVideos(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getSimilarMovies (req, res, next) {
    const { id } = req.params;

    this._services.getSimilarMovies(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getRecommendMovies (req, res, next) {
    const { id } = req.params;

    this._services.getRecommendMovies(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }
}

module.exports = MovieRoutes;