/**
 * Simplify credits response from API and complete url of profile images 
 */
 
'use strict';

const processProfileUrls = (credits, profilePrefix) => {
  
  let newCredits = [];
  
  for (let i = 0; i < credits.length; i++) {
    let newProfilePath = {};
    for (let size in profilePrefix) {
      newProfilePath[size] = credits[i].profilePath ? 
        `${profilePrefix[size]}${credits[i].profilePath}` : null;
    }
    newCredits.push(Object.assign(
      {}, credits[i], { profilePath: newProfilePath }));
  }
  
  return newCredits;
};

const simplifyProfile = (credits) => {
  const cast = credits.cast;
  const crewItems = credits.crew;
  
  const directors   = [];
  const writers     = [];
  const producers   = [];
  const photography = [];
  const music       = [];
  
  for (let i = 0; i < crewItems.length; i++) {
    
    let crew = crewItems[i];
    
    if (crew.department === 'Directing' && 
        crew.job === 'Director')
        directors.push(Object.assign({}, crew));
    
    if (crew.department === 'Production' && 
        crew.job === 'Executive Producer' || crew.job === 'Producer')
        producers.push(Object.assign({}, crew));
        
    if (crew.department === 'Writing' && 
        crew.job === 'Screenplay' || crew.job === 'Writer' || crew.job === 'Novel')
        writers.push(Object.assign({}, crew));
    
    if (crew.department === 'Camera' && 
        crew.job === 'Director of Photography')
        photography.push(Object.assign({}, crew));
        
    if (crew.department === 'Sound' && 
        crew.job === 'Original Music Composer')
        music.push(Object.assign({}, crew));
  }
  
  return {
    cast: cast.map(cast => Object.assign({}, cast)),
    directors: directors,
    producers: producers,
    writers: writers,
    photography: photography,
    music: music
  };
};

module.exports = (options) => {
  const root = (options && options.root) || {};
  const profilePrefix = (options && options.profileUrlPrefix) || {};
  
  if (typeof root !== 'object') throw new TypeError('Invalid value for options.root');
  
  const credits = simplifyProfile(root);
  
  for (let job in credits) {
    credits[job] = processProfileUrls(credits[job], profilePrefix);
  }
  
  return credits;
};