import { schema } from 'normalizr';

const castSchema = new schema.Entity('cast');
const directorSchema = new schema.Entity('directors');
const producersSchema = new schema.Entity('producers');
const writersSchema = new schema.Entity('writers');
const photographySchema = new schema.Entity('photography');
const musicSchema = new schema.Entity('music');
const seasonsSchema = new schema.Entity('seasons');
const movieSchema = new schema.Entity('movie');
const tvSchema = new schema.Entity('tv');

const movieInfo = new schema.Entity('movie', {
  movie: movieSchema,
  credits: {
    cast: [ castSchema ],
    directors: [ directorSchema ],
    producers: [ producersSchema ],
    writers: [ writersSchema ],
    photography: [ photographySchema ],
    music: [ musicSchema ]
  }
});

const tvInfo = new schema.Entity('tv', {
  tv: tvSchema,
  seasons: [ seasonsSchema ],
  credits: {
    cast: [ castSchema ],
    directors: [ directorSchema ],
    producers: [ producersSchema ],
    writers: [ writersSchema ],
    photography: [ photographySchema ],
    music: [ musicSchema ]
  }
});

export const movieResultSchema = [ movieSchema ];
export const movieInfoSchema = movieInfo;
export const tvResultSchema = [ tvSchema ];
export const tvInfoSchema = tvInfo;