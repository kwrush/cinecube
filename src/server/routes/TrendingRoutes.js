const Routable = require('./Routable');
const TrendingServices = require('../services/TrendingServices');

class TrendingRoutes extends Routable {
  constructor (router) {
    super(router);
    this._services = new TrendingServices();
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSION}/trending`;

    this._router.get(
      `${baseURL}/all`,
      this._getTrendingAll.bind(this)
    );

    this._router.get(
      `${baseURL}/movie`,
      this._getTrendingMovies.bind(this)
    );

    this._router.get(
      `${baseURL}/tv`,
      this._getTrendingTvs.bind(this)
    );

    this._router.get(
      `${baseURL}/people`,
      this._getTrendingPeople.bind(this)
    );
  }

  _getTrendingAll (req, res, next) {
    this._services.trendingAll()
      .then(data => res.send(data))
      .catch(next);
  }

  _getTrendingMovies (req, res, next) {
    this._services.trendingMovies()
      .then(data => res.send(data))
      .catch(next);
  }

  _getTrendingTvs (req, res, next) {
    this._services.trendingTvs()
      .then(data => res.send(data))
      .catch(next);
  }

  _getTrendingPeople (req, res, next) {
    this._services.trendingPeople()
      .then(data => res.send(data))
      .catch(next);
  }
}

module.exports = TrendingRoutes;