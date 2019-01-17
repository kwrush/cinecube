const { schema } = require('normalizr');

// movie entities
const movie = new schema.Entity('movie');
// tv entities
const tv = new schema.Entity('tv');
// genres
const genres = new schema.Entity('genres');
// Assigns entities to differnt entiities by value of media_type 
const mediaType = new schema.Union({
  movie: movie,
  tv: tv
}, 'media_type');
// People entiies
const peopleResults = new schema.Entity('results', { known_for: [mediaType] });
const genreResults = { genres: [genres] };

module.exports = {
  peopleResults: { results: [peopleResults] },
  genreResults
};