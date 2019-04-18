const Servable = require('./Servable');
const axios = require('axios');
const endpoints = require('../utils/endpoints');
const config = require('../config.json').config;
const { normalize } = require('normalizr');
const schemas = require('../utils/schema');
const { mapResultsToKey } = require('../utils/helper');

const getApiKey = () => `?api_key=${config.apiKey}`;

class TrendingServices extends Servable {

  constructor () {
    super();
    this._api = axios.create({
      baseURL: 'https://api.themoviedb.org/3/trending'
    });
  }

  async trendingAll () {
    const res = await this._api.get(endpoints.trending.all + getApiKey());
    const data = this._addMediaType(res.data);
    return normalize({ results: data }, schemas.multiResults);
  }

  async trendingMovies () {
    const res = await this._api.get(endpoints.trending.movie + getApiKey());
    const data =  this._addMediaType(res.data);
    return mapResultsToKey(
      normalize({ results: data }, schemas.mediaResults),
      'movie');
  }

  async trendingTvs () {
    const res = await this._api.get(endpoints.trending.tv + getApiKey());
    const data = this._addMediaType(res.data);
    return mapResultsToKey(
      normalize({ results: data }, schemas.mediaResults), 
      'tv');
  }

  async trendingPeople () {
    const res = await this._api.get(endpoints.trending.people + getApiKey());
    const data = this._addMediaType(res.data);
    return mapResultsToKey(
      normalize({ results: data }, schemas.peopleResults),
      'people');
  }

  _addMediaType (data) {
    return data.results.map(result => {
      const type = result.known_for 
        ? 'people'
        : result.first_air_date
          ? 'tv'
          : 'movie';

      return Object.assign({}, 
        { ...result }, 
        { media_type: type });
    });
  }
}

module.exports = TrendingServices;