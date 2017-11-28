/**
 * Make sure that keys of JSON response from tmdb API
 * are in camel case.
 */

'use strict';

const camelCase = require('lodash').camelCase;

const camelCaseKey = (obj) => {
  const newObj = Array.isArray(obj) ? [] : {};
  
  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      newObj[camelCase(prop)] = camelCaseKey(obj[prop]);
    } else {
      newObj[camelCase(prop)] = obj[prop];
    }
  }
  
  return newObj;
};

module.exports = camelCaseKey;
