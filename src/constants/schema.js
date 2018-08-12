import { schema } from 'normalizr';

const castSchema = new schema.Entity('cast');
const directorSchema = new schema.Entity('directors');
const producersSchema = new schema.Entity('producers');
const writersSchema = new schema.Entity('writers');
const photographySchema = new schema.Entity('photography');
const musicSchema = new schema.Entity('music');
const seasonsSchema = new schema.Entity('seasons');
const knownForSchema = new schema.Entity('knownFor');
const movieSchema = new schema.Entity('movie');
const tvSchema = new schema.Entity('tv');
const peopleSchema = new schema.Entity('people');
const profileSchema = new schema.Entity('profile');

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

const peopleResult = new schema.Entity('people', {
  people: [ peopleSchema ],
  knownFor: [ knownForSchema ]
});

const peopleProfile = new schema.Entity('profile', {
  profile: profileSchema,
  knownFor: {
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
export const peopleResultSchema = [ peopleResult ];
export const peopleProfileSchema = peopleProfile;