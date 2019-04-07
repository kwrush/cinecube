const Routable = require('./Routable');
const TvServices = require('../services/TvServices');
const tmdb = require('../utils/api');

class TvRoutes extends Routable {

  constructor (router) {
    super(router);
    this._tvServices = new TvServices(tmdb);
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSION}/tv`;

    this._router.get(
      `${baseURL}/popular`,
      this._getPopularTvs.bind(this)
    );

    this._router.get(
      `${baseURL}/top-rated`,
      this._getTopRatedTvs.bind(this)
    );

    this._router.get(
      `${baseURL}/on-air`,
      this._getOnAirTvs.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)`,
      this._getTv.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/info`,
      this._getTvInfo.bind(this)
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

    this._router.get(
      `${baseURL}/:id(\\d+)/recommend`,
      this._getRecommendTvs.bind(this)
    );
  }

  _getPopularTvs (req, res, next) {
    this._tvServices.getPopularTvs(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getOnAirTvs (req, res, next) {
    this._tvServices.getOnAirTvs(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getTopRatedTvs (req, res, next) {
    this._tvServices.getTopRatedTvs(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getTv (req, res, next) {
    const { id } = req.params;
    this._tvServices.getTv(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getTvInfo (req, res, next) {
    const { id } = req.params;
    this._tvServices.getTvInfo(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getTvCredits (req, res, next) {
    const { id } = req.params;

    this._tvServices.getTvCredits(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getTvImages (req, res, next) {
    const { id } = req.params;

    this._tvServices.getTvImages(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getTvVideos (req, res, next) {
    const { id } = req.params;

    this._tvServices.getTvVideos(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getSimilarTvs (req, res, next) {
    const { id } = req.params;

    this._tvServices.getSimilarTvs(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getRecommendTvs (req, res, next) {
    const { id } = req.params;

    this._tvServices.getRecommendTvs(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }
}

module.exports = TvRoutes;