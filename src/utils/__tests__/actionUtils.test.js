import * as utils from '../actionUtils';


describe('Action utilities tests', () => {
  it('should set fetching status correctly', () => {
    const expected = { popular: { isFetching: true } };
    expect(utils.setFetching('popular', true)).toEqual(expected);
  });

  it('should set error correctly', () => {
    const expected = { popular: { error: 'Error' } };
    expect(utils.setError('popular', 'Error')).toEqual(expected);
  });

  it('should set list results correctly', () => {
    const result = {
      page: 1,
      totalPages: 10,
      results: [1, 2, 3]
    };

    const expected = { 
      popular: {
        page: result.page,
        totalPages: result.totalPages,
        items: result.results
      }
    };

     expect(utils.setListResults('popular', result)).toMatchObject(expected);
  });

  it('should set info result correctly', () => {
    const expected = {
      info: { target: 1 } 
    };

    const result = { id: 1, name: 'test', else: {} };

    expect(utils.setInfoResult(result)).toMatchObject(expected);
  });
});