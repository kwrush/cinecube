/**
 * TODO: test cases
 */

'use strict'; 
 
var expect = require('chai').expect;

describe('middleware tests', function () {
  it ('should convert key value into camel case', function () {
    // dummy data
    var obj = {
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
    
    var camelCase = require('../middlewares/camelCaseKey');
    var newObj = camelCase(obj);
    
    var props = Object.keys(newObj);
    var directorProps = Object.keys(newObj.crew.director);
    var actorProps = Object.keys(newObj.crew.actors[1]);
    
    expect(props[1]).to.equal('releaseDate');
    expect(props[2]).to.equal('posterUrl');
    expect(directorProps[1]).to.equal('dateOfBirth');
    expect(actorProps[0]).to.equal('name');
    expect(actorProps[1]).to.equal('dateOfBirth');
  });
});