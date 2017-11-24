/**
 * Make sure that keys of JSON response from tmdb API
 * are in camel case.
 */

'use strict';

var _  = require('lodash');

var camelCase = function (obj) {
  var newObj = _.isArray(obj) ? [] : {};
  
  for (var prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      newObj[_.camelCase(prop)] = camelCase(obj[prop]);
    } else {
      newObj[_.camelCase(prop)] = obj[prop];
    }
  }
  
  return newObj;
}

module.exports = camelCase;
