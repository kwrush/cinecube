const Servable = require('./Servable');
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');
const { mapResultsToKey } = require('../utils/helper');

class TvServices extends Servable {

  async _getTvResults (options = {}, func) {
    const result = await this
      ._makeRequest(options, func);

    return mapResultsToKey(
      normalize(result, schemas.mediaResults),
      'tv'
    );
  }

  async getPopularTvs (options = {}) {
    return this
      ._getTvResults(options, this._api.miscPopularTvs);
  }

  async getOnAirTvs (options = {}) {
    return this
      ._getTvResults(options, this._api.tvOnTheAir);
  }

  async getTopRatedTvs (options = {}) {
    return this
      ._getTvResults(options, this._api.miscTopRatedTvs);
  }

  async getTv (id, options = {}) {

    const [
      info, 
      credits,
      images,
      videos,
      similar,
      recommendation
    ] = await Promise.all([
      this.getTvInfo(id, options),
      this.getTvCredits(id, options),
      this.getTvImages(id, options),
      this.getTvVideos(id, options),
      this.getSimilarTvs(id, options),
      this.getRecommendTvs(id, options)
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
        tv: {
          ...similar.entities,
          ...recommendation.entities,
          [info.id]: res
        }
      },
      result: { id: info.id }
    };
  }

  async getTvInfo (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvInfo);
  }
  
  async getTvImages (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvImages);
  }

  async getTvVideos (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvVideos);
  }

  async getTvCredits (id, options = {}) {
    return this
      ._makeRequestById(id, options, this._api.tvCredits);
  }

  async getSimilarTvs (id, options = {}) {
    const data = await this
      ._makeRequestById(id, options, this._api.tvSimilar);
    const normalized = normalize(data, schemas.mediaResults);
    return {
      entities: { ...normalized.entities.results },
      result: normalized.result.results
    };
  }

  async getRecommendTvs (id, options = {}) {
    const data = await this
      ._makeRequestById(id, options, this._api.tvRecommend);
    const normalized = normalize(data, schemas.mediaResults);
    return {
      entities: { ...normalized.entities.results },
      result: normalized.result.results
    };
  }
}

module.exports = TvServices;