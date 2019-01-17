const Routable = require('./Routable');
const PeopleServices = require('../services/PeopleServices');
const tmdb = require('../utils/api');

class PeopleRoutes extends Routable {

  constructor (router) {
    super(router);
    this._peopleServices = new PeopleServices(tmdb);
  }

  _registerRoutes () {

    const baseURL = `/${this._VERSON}/people`;

    this._router.get(
      `${baseURL}/popular`,
      this._getPopularPeoples.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)`,
      this._getPeople.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/info`,
      this._getPeopleInfo.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/images`,
      this._getPeopleImages.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/credits`,
      this._getPeopleCombinedCredits.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/movie_credits`,
      this._getPeopleMovieCredits.bind(this)
    );

    this._router.get(
      `${baseURL}/:id(\\d+)/tv_credits`,
      this._getPeopleTvCredits.bind(this)
    );
  }

  _getPopularPeoples (req, res, next) {
    this._peopleServices.getPopularPeople(req.query)
      .then(data => res.send(data))
      .catch(next);
  }

  _getPeople (req, res, next) {
    const { id } = req.params;
    this._peopleServices.getPeople(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getPeopleInfo (req, res, next) {
    const { id } = req.params;
    this._peopleServices.getPeopleInfo(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getPeopleMovieCredits (req, res, next) {
    const { id } = req.params;

    this._peopleServices.getPeopleMovieCredits(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getPeopleTvCredits (req, res, next) {
    const { id } = req.params;

    this._peopleServices.getPeopleTvCredits(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getPeopleCombinedCredits (req, res, next) {
    const { id } = req.params;

    this._peopleServices.getPeopleCombinedCredits(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }

  _getPeopleImages (req, res, next) {
    const { id } = req.params;

    this._peopleServices.getPeopleImages(id, req.query)
      .then(data => {
        data ? res.send(data) : res.status(404).end();
      })
      .catch(next);
  }
}

module.exports = PeopleRoutes;