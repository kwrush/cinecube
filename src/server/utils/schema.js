const { schema } = require('normalizr');

const schemas = {};

const results = new schema.Entity('results');

const movie = new schema.Entity('movie');
const tv = new schema.Entity('tv');

const cast = new schema.Entity('cast', {}, { idAttribute: 'credit_id' });
const crew = new schema.Entity('crew', {}, { idAttribute: 'credit_id' });

const mediaType = new schema.Union({
  movie: movie,
  tv: tv
}, 'media_type');

// persons list
const persons = new schema.Entity('results', { knownFor: [mediaType] });

// person returned by search multi
const person = new schema.Entity('person', { knownFor: [mediaType] });

// used to normalize entities returned by search multi
const mediaTypeMulti = new schema.Union({
  movie: movie,
  tv: tv,
  person: person 
}, 'media_type');

// pre process people credits, to keep only necessary information of movie or tv
const creditProcessStrategy = (entity) => {
  const propsToKeep = [
    'id', 'media_type', 'character', 'title', 'post_path', 'release_date', 'credit_id', 'department', 'job'
  ];

  let newEntity = {};

  for (let prop of propsToKeep) {
    entity[prop] && (newEntity[prop] = entity[prop]);
  }

  return newEntity;
};

const castCredit = new schema.Entity('cast', {}, { 
  idAttribute: 'credit_id',
  processStrategy: creditProcessStrategy 
});

const crewCredit = new schema.Entity('crew', {}, { 
  idAttribute: 'credit_id',
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