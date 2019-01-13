const Routable = require('./Routable');
const TvServices = require('../services/TvServices');
const tmdb = require('../utils/api');

class TvRoutes extends Routable {

  constructor (router) {
    super(router);
    this._tvServices = new TvServices(tmdb);
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSON}/tv`;

    this._router.get(
      `${baseURL}/popular`,
      this._getPopularTvs.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)`,
      this._getTvDetails.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/intro`,
      this._getTvIntro.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/images`,
      this._getTvImages.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/videos`,
      this._getTvVideos.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/credits`,
      this._getTvCredits.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/similar`,
      this._getSimilarTvs.bind(this)
    );
  }

  _getPopularTvs (req, res, next) {
    this._tvServices.getPopularTvs(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getTvIntro (req, res, next) {
    const { id } = req.params;
    this._tvServices.getTvIntro(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getTvDetails (req, res, next) {
    const { id } = req.params;
    this._tvServices.getTvDetails(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getTvCredits (req, res, next) {
    const { id } = req.params;

    this._tvServices.getTvCredits(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getTvImages (req, res, next) {
    const { id } = req.params;

    this._tvServices.getTvImages(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getTvVideos (req, res, next) {
    const { id } = req.params;

    this._tvServices.getTvVideos(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getSimilarTvs (req, res, next) {
    const { id } = req.params;

    this._tvServices.getSimilarTvs(id, req.query)
      .then(data => res.send(data))
      .catch(next);
  }
}

module.exports = TvRoutes;