const Servable = require('./Servable');

class TvServices extends Servable {

  getPopularTvs (options = {}) {
    return this
      ._makeRequest(options, this._api.miscPopularTvs);
  }

  getTv (id, options = {}) {

    return Promise.all([
      this.getTvInfo(id, options),
      this.getTvCredits(id, options),
      this.getTvImages(id, options),
      this.getTvVideos(id, options),
      this.getSimilarTvs(id, options)
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

  getTvInfo (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieInfo);
  }
  
  getTvImages (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieImages);
  }

  getTvVideos (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieVideos);
  }

  getTvCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieCredits);
  }

  getSimilarTvs (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.movieSimilar);
  }
}

module.exports = TvServices;