/**
 * TODO: test cases
 */

'use strict'; 
 
const expect = require('chai').expect;

describe('middleware tests', () => {
  it ('should convert key value into camel case', () => {
    // dummy data
    let obj = {
      title: 'Something',
      release_date: '22/12/2017',
      poster_url: '/p/img/123',
      crew: {
        director: {
          name: 'Jack',
          date_of_birth: '11/10/1965'
        },
        actors: [
          {
            name: 'Tom',
            date_of_birth: '1/4/1977'
          },
          {
            name: 'Jane',
            date_of_birth: '2/5/1980'
          }
        ]
      }
    };
    
    const camelCase = require('../middlewares/camelCaseKey');
    let newObj = camelCase(obj);
    
    const props = Object.keys(newObj);
    const directorProps = Object.keys(newObj.crew.director);
    const actorProps = Object.keys(newObj.crew.actors[1]);
    
    expect(props[1]).to.equal('releaseDate');
    expect(props[2]).to.equal('posterUrl');
    expect(directorProps[1]).to.equal('dateOfBirth');
    expect(actorProps[0]).to.equal('name');
    expect(actorProps[1]).to.equal('dateOfBirth');
  });
  
  it('should complete image urls by adding prefix', () => {
    const results = [
      {
        posterPath: 'poster0.jpeg',
        backdropPath: 'backdrop0.jpeg'
      },
      {
        posterPath: 'poster1.jpeg',
        backdropPath: 'backdrop1.jpeg'
      },
      {
        posterPath: 'poster2.jpeg',
        backdropPath: 'backdrop2.jpeg'
      }
    ];
    
    const posterPrefix = {
      s: 'poster/s/',
      m: 'poster/m/',
      l: 'poster/l/',
      orig: 'poster/original/'
    };
    
    const backdropPrefix = {
      s: 'backdrop/s/',
      m: 'backdrop/m/',
      l: 'backdrop/l/',
      orig: 'backdrop/original/'
    };
    
    const tmdbImageUrl = require('../middlewares/tmdbImageUrl');
    
    const newResults = tmdbImageUrl({
      root: results,
      posterUrlPrefix: posterPrefix,
      backdropUrlPrefix: backdropPrefix
    });
    
    expect(newResults[0].posterPath).to.have.property('s', 'poster/s/poster0.jpeg');
    expect(newResults[0].posterPath).to.have.property('m', 'poster/m/poster0.jpeg');
    expect(newResults[0].backdropPath).to.have.property('l', 'backdrop/l/backdrop0.jpeg')
    expect(newResults[0].backdropPath).to.have.property('orig', 'backdrop/original/backdrop0.jpeg');
    expect(newResults[2].posterPath).to.have.property('s', 'poster/s/poster2.jpeg');
    expect(newResults[2].posterPath).to.have.property('m', 'poster/m/poster2.jpeg');
    expect(newResults[2].backdropPath).to.have.property('l', 'backdrop/l/backdrop2.jpeg')
    expect(newResults[2].backdropPath).to.have.property('orig', 'backdrop/original/backdrop2.jpeg');
  });
});