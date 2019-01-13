const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

class MovieServices extends Servable {

  getPopularMovies(options = {}) {
    return this._api.movie
      .popular(options)
      .then(data => {
        if (data.results) {
          return normalize(data, schemas.mediaResults);
        } else {
          return false;
        }
      });
  }
  
  getMovieDetails(id, options) {
    if (!id) {
      return Promise.reject('Invalid movie id value');
    }

    return Promise.all([
      this.getMovieIntro(id, options),
      this.getMovieCredits(id, options),
      this.getMovieImages(id, options),
      this.getMovieVideos(id, options),
      this.getSimilarMovies(id, options)
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

  getMovieIntro(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid movie id value');
    }

    return this._api.movie
      .details(id, options)
      .then(data => data);
  }

  getMovieImages(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid movie id value');
    }

    return this._api.movie
      .images(id, options)
      .then(data => data);
  }

  getMovieVideos(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid movie id value');
    }

    return this._api.movie
      .videos(id, options)
      .then(data => data);
  }

  getMovieCredits(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid movie id value');
    }

    return this._api.movie
      .credits(id, options)
      .then(data => data);
  }

  getSimilarMovies(id, options = {}) {
    if (!id) {
      return Promise.reject('Invalid movie id value');
    }

    return this._api.movie
      .similar(id, options)
      .then(data => {
        let similar = normalize(data, schemas.mediaResults);
        return Object.assign({}, 
          { entities: similar.entities }, 
          { similar: similar.result });
      });
  }
}

module.exports = MovieServices;