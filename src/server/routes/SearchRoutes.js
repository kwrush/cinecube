const Routable = require('./Routable');
const SearchServices = require('../services/SearchServices');
const tmdb = require('../utils/api');

class SearchRoutes extends Routable {

  constructor (router) {
    super(router);
    this._searchServices = new SearchServices(tmdb);
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSON}/search`;

    this._router.get(
      `${baseURL}/movie`,
      this._searchMovie.bind(this)
    );
    
    this._router.get(
      `${baseURL}/tv`,
      this._searchTv.bind(this)
    );

    this._router.get(
      `${baseURL}/people`,
      this._searchPeople.bind(this)
    );

    this._router.get(
      `${baseURL}/multi`,
      this._searchMulti.bind(this)
    );
  }

  _searchMovie (req, res, next) {
    this._searchServices.searchMovies(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _searchTv (req, res, next) {
    this._searchServices.searchTvs(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _searchPeople (req, res, next) {
    this._searchServices.searchPeople(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _searchMulti (req, res, next) {
    this._searchServices.searchMulti(req.query)
      .then(data => res.send(data))
      .catch(next);
  }
}

module.exports = SearchRoutes;