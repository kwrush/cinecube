const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

describe('schema and normalizer test', () => {
  it('should normalize media results correctly', () => {
    const res = {
      page: 1,
      totalPages: 10,
      results: [
        {
          id: 1,
          title: 'a'
        },
        {
          id: 2,
          title: 'b'
        }
      ]
    };
    const norm = normalize(res, schemas.mediaResults);
    expect(norm.entities).toHaveProperty('results');
    expect(Object.keys(norm.entities.results).sort()).toEqual(['1', '2'].sort());
    expect(Object.keys(norm.result).sort()).toEqual(['page', 'totalPages', 'results'].sort());
    expect(norm.result.results).toEqual([1, 2]);
  });

  it('should normalize persons list correctly', () => {
    const res = {
      page: 1,
      totalPages: 10,
      results: [
        {
          id: 1,
          name: 'a',
          knownFor: [
            {
              id: 1,
              mediaType: 'movie',
              title: 'movie1'
            },
            {
              id: 2,
              mediaType: 'tv',
              title: 'tv2'
            }
          ]
        },
        {
          id: 2,
          name: 'b',
          knownFor: [
            {
              id: 1,
              mediaType: 'movie',
              title: 'movie1'
            },
            {
              id: 1,
              mediaType: 'tv',
              title: 'tv1'
            },
            {
              id: 2,
              mediaType: 'movie',
              title: 'movie2'
            }
          ]
        }
      ]
    };

    const norm = normalize(res, schemas.peopleResults);
    expect(Object.keys(norm.entities).sort()).toEqual(['movie', 'tv', 'results'].sort());
    expect(norm.entities.results['1'].knownFor.map(item => item.id)).toEqual([1, 2]);
    expect(norm.entities.results['2'].knownFor.map(item => item.id)).toEqual([1, 1, 2]);
  });

  it('should normalize and categorize credits by cast and departments', () => {
    const res = {
      id: 1,
      cast: [{
        id: 1,
        name: 'Actor1'
      }, {
        id: 2,
        name: 'Actor2'
      }],
      crew: [{
        id: 3,
        name: 'Director',
        department: 'directing'
      }, {
        id: 4,
        name: 'Producer',
        department: 'production'
      },{
        id: 5,
        name: 'Producer',
        department: 'production'
      }, {
        id: 6,
        name: 'Writter',
        department: 'screenplay'
      }]
    };

    const norm = normalize(res, schemas.mediaCredits);
    expect(Object.keys(norm.entities).sort()).toEqual(['cast', 'crew'].sort());
    expect(Object.keys(norm.result).sort()).toEqual(['id', 'cast', 'directing', 'production', 'screenplay']);
    expect(norm.result.directing).toEqual([3]);
    expect(norm.result.production).toEqual([4, 5]);
  });
});