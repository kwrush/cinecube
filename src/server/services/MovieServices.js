const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');
const { mapResultsToKey } = require('../utils/helper');

class MovieServices extends Servable {

  async _getMovieResults (options = {}, func) {
    const result = await this
      ._makeRequest(options, func);

    return mapResultsToKey(
      normalize(result, schemas.mediaResults),
      'movie'
    );
  }

  async getPopularMovies (options = {}) {
    return this
      ._getMovieResults(options, this._api.miscPopularMovies);
  }

  async getUpcomingMovies (options = {}) {
    return this
      ._getMovieResults(options, this._api.miscPopularMovies);
  }

  async getNowPlayingMovies (options = {}) {
    return this
      ._getMovieResults(options, this._api.miscNowPlayingMovies);
  }

  async getTopRatedMovies (options = {}) {
    return this
      ._getMovieResults(options, this._api.miscTopRatedMovies);
  }

  async getMovie (id, options = {}) {

    const [
      info,
      credits,
      images,
      videos,
      similar,
      recommendation
    ] = await Promise.all([
      this.getMovieInfo(id, options),
      this.getMovieCredits(id, options),
      this.getMovieImages(id, options),
      this.getMovieVideos(id, options),
      this.getSimilarMovies(id, options),
      this.getRecommendMovies(id, options)
    ]);

    const res = {
      ...info,
      ...credits,
      ...images,
      videos: videos.results,
      similar: similar.result,
      recommendation: recommendation.result
    };

    return {
      entities: {
        movie: {
          ...similar.entities,
          ...recommendation.entities,
          [info.id]: res
        }
      },
      result: { id: info.id }
    };
  }

  async getMovieInfo (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieInfo);
  }
  
  async getMovieImages (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieImages);
  }

  async getMovieVideos (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieVideos);
  }

  async getMovieCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieCredits);
  }

  async getSimilarMovies (id, options = {}) {
    const data = await this
      ._makeRequestById(id, options, this._api.movieSimilar);

    const normalized = normalize(data, schemas.mediaResults);
    return {
      entities: { ...normalized.entities.results },
      result: normalized.result.results
    };
  }

  async getRecommendMovies (id, options = {}) {
    const data = await this
      ._makeRequestById(id, options, this._api.movieRecommendations);

    const normalized = normalize(data, schemas.mediaResults);
    return {
      entities: { ...normalized.entities.results },
      result: normalized.result.results
    };
  }
}

module.exports = MovieServices;