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
    
    expect(props[1]).toBe('releaseDate');
    expect(props[2]).toBe('posterUrl');
    expect(directorProps[1]).toBe('dateOfBirth');
    expect(actorProps[0]).toBe('name');
    expect(actorProps[1]).toBe('dateOfBirth');
  });

  it('should sort crew by their department', () => {
    const res = {
      entities: {
        cast: {
          1: { name: 'Actor1' },
          2: { name: 'Actor2'  }
        },
        crew: {
          3: { name: 'Crew1', department: 'a'},
          4: { name: 'Crew1', department: 'b'},
          5: { name: 'Crew1', department: 'a'},
          6: { name: 'Crew1', department: 'b'},
          7: { name: 'Crew1', department: 'c'} 
        }
      },
      result: {
        id: 111,
        cast: [1, 2],
        crew: [3, 4, 5, 6, 7]
      }
    };

    const tmdbSort = require('../middlewares/tmdbSortCrew');
    const rs = tmdbSort(res);

    expect(Object.keys(rs.result).sort()).toEqual(['id', 'cast', 'a', 'b', 'c'].sort());
    expect(rs.result.a).toEqual([3, 5]);
    expect(rs.result.b).toEqual([4, 6]);
    expect(rs.result.c).toEqual([7]);
  });
});