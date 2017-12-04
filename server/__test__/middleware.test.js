'use strict'; 
 
const expect = require('chai').expect;

describe('middleware tests', () => {
  it('should convert key value into camel case', () => {
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
    
    const tmdbPosters = require('../middlewares/tmdbPosters');
    
    const newResults = tmdbPosters({
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

  it('should format credits list and complete profile url', () => {
    const res = require('./__mock__/creditsResponse.json');
    const tmdbCredits = require('../middlewares/tmdbCredits');
    const tmdbProfiles = require('../middlewares/tmdbProfiles');
    const profilePrefix = {
      s: 'images/s',
      m: 'images/m',
      l: 'images/l'
    };
    const credits = tmdbProfiles({
      root: tmdbCredits(res),
      profileUrlPrefix: profilePrefix
    });
    
    expect(credits).to.have.property('directors');
    expect(credits.cast).to.be.an('array');
    expect(credits.directors).to.be.an('array');
    expect(credits.directors[0].profilePath).to.have.property('s', 'images/s/mDLDvsx8PaZoEThkBdyaG1JxPdf.jpg');
  });
  
  it('should complete url of screenshots', () => {
    const res = require('./__mock__/imageResponse.json');
    const tmdbScreenshots = require('../middlewares/tmdbScreenshots');
    const imgPrefix = {
      s: 'images/s',
      m: 'images/m',
      l: 'images/l'
    };
    
    const img = tmdbScreenshots({ root: res, screenshotUrlPrefix: imgPrefix });
    expect(img).to.be.an('array');
    expect(img[0].iso6391).to.be.null;
    expect(img[0]).to.have.property('filePath');
    expect(img[0].filePath).to.have.property('m', 'images/m/c4zJK1mowcps3wvdrm31knxhur2.jpg');
  });
  
  it('should categorize multi search results and complete image urls', () => {
    
    const camelCase = require('../middlewares/camelCaseKey');
    const tmdbMultiSearch = require('../middlewares/tmdbMultiSearch');
    
    const res = camelCase(
      require('./__mock__/multiSearchResponse.json'));
    
    const urlPrefix = {
      s: 'images/s',
      m: 'images/m',
      l: 'images/l'
    };
    
    res.results = 
      tmdbMultiSearch({
        root: res.results,
        posterUrlPrefix: urlPrefix,
        backdropUrlPrefix: urlPrefix,
        profileUrlPrefix: urlPrefix
      });
    
    expect(res.results).to.not.be.an('array');
    expect(res.results).to.have.property('movie');
    expect(res.results).to.have.property('tv');
    expect(res.results).to.have.property('person');
    
    expect(res.results.person).to.have.lengthOf(1);
    expect(res.results.movie).to.have.lengthOf(2);
    expect(res.results.tv).to.have.lengthOf(0);
    
    expect(res.results.movie[0].posterPath).to.have.property(
      's', 
      'images/s/hdYpb9PhIms17OPL6Yz2C0ruxJ1.jpg');
      
    expect(res.results.person[0].profilePath).to.have.property(
      's', 
      'images/s/pQFoyx7rp09CJTAb932F2g8Nlho.jpg');
  });
});