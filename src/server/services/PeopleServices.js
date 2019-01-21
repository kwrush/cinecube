const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');
const {
  mapResultsToKey,
  sortByPopularity,
  pickProperty 
} = require('../utils/helper');

class PeopleServices extends Servable {

  getPopularPeople (options = {}) {
    return this
      ._makeRequest(options, this._api.personPopular)
      .then(data => mapResultsToKey(
        normalize(data, schemas.peopleResults),
        'people'
      ));
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

      // Sorts credits by popularity and 
      // remove useless properties from credits results
      credits.cast = pickProperty(
        sortByPopularity(credits.cast), 
        ['id', 'character', 'title', 'name', 'media_type', 'credit_id', 'poster_path', 'release_date']);
      credits.crew = pickProperty(
        sortByPopularity(credits.crew),
        ['id', 'department', 'job', 'title', 'name', 'media_type', 'credit_id', 'poster_path', 'release_date']);

      return {
        entities: {
          people: {
            [info.id]: {
              ...info,
              ...images,
              ...credits
            }
          }
        },
        result: { id: info.id } 
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