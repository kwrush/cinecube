const { schema } = require('normalizr');

const schemas = {};

const results = new schema.Entity('results');

const movie = new schema.Entity('movie');
const tv = new schema.Entity('tv');

const cast = new schema.Entity('cast', {}, { idAttribute: 'creditId' });
const crew = new schema.Entity('crew', {}, { idAttribute: 'creditId' });

const mediaType = new schema.Union({
  movie: movie,
  tv: tv
}, 'mediaType');

// persons list
const persons = new schema.Entity('results', { knownFor: [mediaType] });

// person returned by search multi
const person = new schema.Entity('person', { knownFor: [mediaType] });

// used to normalize entities returned by search multi
const mediaTypeMulti = new schema.Union({
  movie: movie,
  tv: tv,
  person: person 
}, 'mediaType');

// pre process people credits, to keep only necessary information of movie or tv
const creditProcessStrategy = (entity) => {
  const propsToKeey = [
    'id', 'mediaType', 'character', 'title', 'postPath', 'releaseDate', 'creditId', 'department', 'job'
  ];

  let newEntity = {};

  for (let prop of propsToKeey) {
    entity[prop] && (newEntity[prop] = entity[prop]);
  }

  return newEntity;
};

const castCredit = new schema.Entity('cast', {}, { 
  idAttribute: 'creditId',
  processStrategy: creditProcessStrategy 
});

const crewCredit = new schema.Entity('crew', {}, { 
  idAttribute: 'creditId',
  processStrategy: creditProcessStrategy
});

schemas.mediaResults = { results: [results] };
schemas.peopleResults = { results: [persons] };

schemas.mediaCredits = {
  cast: [cast],
  crew: [crew]
};

schemas.peopleCredits = {
  cast: [castCredit],
  crew: [crewCredit]
};

schemas.multiResults = { results: [mediaTypeMulti] };

module.exports = schemas;