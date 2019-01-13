const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

class PeopleServices extends Servable {

  getPopularPeoples(options = {}) {
    return this._api.people
      .popular(options)
      .then(data => {
        if (data.results) {
          return normalize(data, schemas.mediaResults);
        } else {
          return false;
        }
      });
  }
  
  getPeopleDetails(id, options) {
    if (!id) {
      return Promise.reject('Invalid person id value');
    }

    return Promise.all([
      this.getPeopleIntro(id, options),
      this.getPeopleImages(id, options),
      this.getPeopleMovieCredits(id, options),
      this.getPeopleTvCredits(id, options)
    ]).then(([
      intro, 
      images,
      movieCredits,
      tvCredits
    ]) => {

      return Object.assign({}, 
        intro, 
        images,
        { movie_credits: {
          cast: movieCredits.cast,
          crew: movieCredits.crew
        } },
        { tv_credits: {
          cast: tvCredits.cast,
          crew: tvCredits.crew
        } }
      );
    });
  }

  getPeopleIntro(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid person id value');
    }

    return this._api.people
      .details(id, options)
      .then(data => data);
  }

  getPeopleImages(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid person id value');
    }

    return this._api.people
      .images(id, options)
      .then(data => data);
  }

  getPeopleMovieCredits(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid person id value');
    }

    return this._api.people
      .movieCredits(id, options)
      .then(data => data);
  }

  getPeopleTvCredits(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid person id value');
    }

    return this._api.people
      .tvCredits(id, options)
      .then(data => data);
  }
}

module.exports = PeopleServices;