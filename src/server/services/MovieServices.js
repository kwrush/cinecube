const Servable = require('./Servable');

class MovieServices extends Servable {

  getPopularMovies (options = {}) {
    return this
      ._makeRequest(options, this._api.miscPopularMovies);
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

      credits.cast = credits.cast.slice(0, 5);
      credits.crew = credits.crew.slice(0, 5);

      return {
        ...info,
        ...credits,
        ...images,
        videos: videos.results,
        similar: similar.results.slice(0, 5)
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
      ._makeRequestById(id, options, this._api.movieSimilar);
  }
}

module.exports = MovieServices;