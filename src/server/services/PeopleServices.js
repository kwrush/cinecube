const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

class PeopleServices extends Servable {

  getPopularPeople (options = {}) {
    return this
      ._makeRequest(options, this._api.personPopular)
      .then(data => normalize(data, schemas.peopleResults));
  }

  getPeople (id, options = {}) {
    return Promise.all([
      this.getPeopleInfo(id, options),
      this.getPeopleImages(id, options),
      this.getPeopleCombinedCredits(id, options)
    ])
    .then(([
      info, 
      images,
      credits
    ]) => {

      // get the first five entities
      credits.cast = credits.cast.slice(0, 5);
      credits.crew = credits.crew.slice(0, 5);

      return {
        ...info,
        ...images,
        ...credits
      };
    });
  }

  getPeopleInfo (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.personInfo);
  }
  
  getPeopleImages (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.personImages);
  }

  getPeopleMovieCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.personMovieCredits);
  }

  getPeopleTvCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.personeTvCredits);
  }

  getPeopleCombinedCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.personCombinedCredits);
  }
}

module.exports = PeopleServices;