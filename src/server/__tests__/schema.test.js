const { normalize } = require('normalizr');
const schemas = require('../utils/schema');

describe('schema and normalizer test', () => {
  it('should normalize persons list correctly', () => {
    const res = {
      page: 1,
      total_pages: 10,
      results: [
        {
          id: 1,
          name: 'a',
          known_for: [
            {
              id: 1,
              media_type: 'movie',
              title: 'movie1'
            },
            {
              id: 2,
              media_type: 'tv',
              title: 'tv2'
            }
          ]
        },
        {
          id: 2,
          name: 'b',
          known_for: [
            {
              id: 1,
              media_type: 'movie',
              title: 'movie1'
            },
            {
              id: 1,
              media_type: 'tv',
              title: 'tv1'
            },
            {
              id: 2,
              media_type: 'movie',
              title: 'movie2'
            }
          ]
        }
      ]
    };

    const norm = normalize(res, schemas.peopleResults);
    expect(Object.keys(norm.entities).sort()).toEqual(['movie', 'tv', 'results'].sort());
    expect(norm.entities.results['1'].known_for.map(item => item.id)).toEqual([1, 2]);
    expect(norm.entities.results['2'].known_for.map(item => item.id)).toEqual([1, 1, 2]);
  });

  it('should normalize genres correctly', () => {
    const res = {
      genres: [
        {
          id: 28,
          name: "Action"
        },
        {
          id: 12,
          name: "Adventure"
        },
        {
          id: 16,
          name: "Animation"
        },
        {
          id: 35,
          name: "Comedy"
        },
        {
          id: 80,
          name: "Crime"
        }
      ]
    };

    const norm = normalize(res, schemas.genreResults);
    expect(Object.keys(norm.entities)).toEqual(['genres']);
    expect(norm.result.genres).toEqual([28, 12, 16, 35, 80]);
  });
});