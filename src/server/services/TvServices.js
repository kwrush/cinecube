const { pick } = require('lodash');
const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');
const { mapResultsToKey } = require('../utils/helper');

class TvServices extends Servable {

  getPopularTvs (options = {}) {
    return this
      ._makeRequest(options, this._api.miscPopularTvs)
      .then(data => mapResultsToKey(
        normalize(data, schemas.mediaResults),
        'tv'
      ));
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

      const res = {
        ...info,
        ...credits,
        ...images,
        videos: videos.results,
        similar: similar.result
      };

      return {
        entities: {
          tv: {
            ...similar.entities,
            [info.id]: res
          }
        },
        result: { id: info.id }
      };
    });
  }

  getTvInfo (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvInfo);
  }
  
  getTvImages (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvImages);
  }

  getTvVideos (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvVideos);
  }

  getTvCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvCredits);
  }

  getSimilarTvs (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvSimilar)
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

module.exports = TvServices;