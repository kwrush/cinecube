const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

class TvServices extends Servable {

  getPopularTvs(options = {}) {
    return this._api.tv
      .popular(options)
      .then(data => {
        if (data.results) {
          return normalize(data, schemas.mediaResults);
        } else {
          return false;
        }
      });
  }
  
  getTvDetails(id, options) {
    if (!id) {
      return Promise.reject('Invalid tv id value');
    }

    return Promise.all([
      this.getTvIntro(id, options),
      this.getTvCredits(id, options),
      this.getTvImages(id, options),
      this.getTvVideos(id, options),
      this.getSimilarTvs(id, options)
    ]).then(([
      intro, 
      credits,
      images,
      videos,
      similar
    ]) => {
      return Object.assign({}, 
        intro, 
        credits, 
        images, 
        { videos: videos.results }, 
        similar
      );
    });
  }

  getTvIntro(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid tv id value');
    }

    return this._api.tv
      .details(id, options)
      .then(data => data);
  }

  getTvImages(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid tv id value');
    }

    return this._api.tv
      .images(id, options)
      .then(data => data);
  }

  getTvVideos(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid tv id value');
    }

    return this._api.tv
      .videos(id, options)
      .then(data => data);
  }

  getTvCredits(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid tv id value');
    }

    return this._api.tv
      .credits(id, options)
      .then(data => data);
  }

  getSimilarTvs(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid tv id value');
    }

    return this._api.tv
      .similar(id, options)
      .then(data => {
        let similar = normalize(data, schemas.mediaResults);
        return Object.assign({}, 
          { entities: similar.entities }, 
          { similar: similar.result });
      });
  }
}

module.exports = TvServices;