/**
 * Complete url of profile images
 */
 
'use strict';

const processProfileUrls = (credit, profilePrefix) => {
  
  let newProfilePath = {};
  
  for (let size in profilePrefix) {
    newProfilePath[size] = credit.profilePath ? 
      `${profilePrefix[size]}${credit.profilePath}` : null;
  }
  
  return Object.assign({}, credit, { profilePath: newProfilePath });
};

module.exports = (options) => {
  const credits = (options && options.root) || {};
  const profilePrefix = (options && options.profileUrlPrefix) || {};
  
  if (typeof credits !== 'object') throw new TypeError('Invalid value for options.root');
  
  // if the credits is an object
  // { cast: [...], directors: [...], ... }
  if (!Array.isArray(credits)) {
    let profiles = {};
    for (let job in credits) {
      profiles[job] = 
        credits[job].map(credit => processProfileUrls(credit, profilePrefix));
    }
    
    return profiles;
  }
  
  return credits.map(
    credit => processProfileUrls(credit, profilePrefix));
};