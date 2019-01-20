const { schema } = require('normalizr');

// results entities
const results = new schema.Entity('results');
// movie entities
const movie = new schema.Entity('movie');
// tv entities
const tv = new schema.Entity('tv');
// genres
const genres = new schema.Entity('genres');
// Used to assign movie and tv entities in different categories by their media types
const mediaType = new schema.Union({
  movie: movie,
  tv: tv
}, 'media_type');
// Used to normalize results returned from 'search multi'
const people = new schema.Entity('people', { known_for: [mediaType] });
// Used to normalize resutls returned from 'popular people' or 'search'
const peopleResults = new schema.Entity('results', { known_for: [mediaType] });
// Used to normalize results contains multiple media types
const mediaTypes = new schema.Union({
  movie: movie,
  tv: tv,
  people: people
}, 'media_type'); 

// Genres results
const genreResults = { genres: [genres] };

module.exports = {
  mediaResults: { results: [results] },
  peopleResults: { results: [peopleResults] },
  multiResults: { results: [mediaTypes]},
  genreResults
};