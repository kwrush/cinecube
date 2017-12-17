import { expect } from 'chai';
import { normalize } from 'normalizr';
import { movieResultSchema, movieInfoSchema, tvInfoSchema } from '../schema';

describe('Normalizr schema testing', () => {
  describe('Movie schema testing', () => {
    it('should normalize popular movie api response', () => {
      const data = require('./__mock__/popularMovie.json');
      const rs = normalize(data.results, movieResultSchema);
      expect(rs).to.be.an('object');
      expect(Object.keys(rs)).to.have.lengthOf(2);
    });

    it('should normalize movie info response', () => {
      const data = require('./__mock__/movieInfo.json');
      const rs = normalize(data, movieInfoSchema);
      expect(rs.entities).to.have.all.keys('movie', 'producers', 'directors', 'cast', 'photography', 'writers');
      expect(rs.entities.cast).to.be.an('object');
      expect(rs.entities.movie['346364'].credits.cast).to.include.members([1274508]);
    });
  });

  describe('Tv schema testing', () => {
    it('should normalize tv info response', () => {
      const data = require('./__mock__/tvInfo.json');
      const rs = normalize(data, tvInfoSchema);
      expect(rs.entities).to.have.all.keys('tv', 'cast', 'seasons');
      expect(rs.entities.seasons).to.be.an('object');
      expect(rs.entities.tv['1418'].seasons).to.include.members([3732]);
    });
  });
});