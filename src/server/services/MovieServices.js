const { pick } = require('lodash');
const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');
const { mapResultsToKey } = require('../utils/helper');

class MovieServices extends Servable {

  getPopularMovies (options = {}) {
    return this
      ._makeRequest(options, this._api.miscPopularMovies)
      .then(data => mapResultsToKey(
        normalize(data, schemas.mediaResults),
        'movie'
      ));
  }

  getMovie (id, options = {}) {

    return Promise.all([
      this.getMovieInfo(id, options),
      this.getMovieCredits(id, options),
      this.getMovieImages(id, options),
      this.getMovieVideos(id, options),
      this.getSimilarMovies(id, options)
    ])
    .then(([
      info, 
      credits,
      images,
      videos,
      similar
    ]) => {

      const res = {
        ...info,
        ...credits,
        ...images,
        videos: videos.results,
        similar: similar.result
      };

      return {
        entities: {
          movie: {
            ...similar.entities,
            [info.id]: res
          }
        },
        result: { id: info.id }
      };
    });
  }

  getMovieInfo (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieInfo);
  }
  
  getMovieImages (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieImages);
  }

  getMovieVideos (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieVideos);
  }

  getMovieCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieCredits);
  }

  getSimilarMovies (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieSimilar)
      .then(data => {
        const n = normalize(data, schemas.mediaResults);
        // keep the first 10 or fewer results
        const toKeep = n.result.results.slice(0, 10);
        return {
          entities: pick(n.entities.results, toKeep),
          result: toKeep
        };
      });
  }
}

module.exports = MovieServices;