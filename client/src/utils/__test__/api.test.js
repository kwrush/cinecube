import axios from 'axios';
import moxios from 'moxios';
import { expect } from 'chai';
import sinon from 'sinon';
import { API_KEY, API_URL, LANG } from '../../constants/appContants';
import { searchMovie } from '../api';

describe('movie api', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return the result matched the searching query', (done) => {
    const query = 'something';
    const option = {};
    const expectedResults = ['Movie1', 'Movie2'];

    moxios.stubRequest(API_URL + 
      `search/movie?api_key=${API_KEY}&language=${LANG}&query=${query}&page=1&region=&year=`, 
      {
        status: 200,
        response: expectedResults
      });
    
    let onResolve = sinon.spy();
    searchMovie(query, option).then(onResolve);

    moxios.wait(() => {
      expect(onResolve.getCall(0).args[0]).eql(expectedResults);
      done();
    });
  });
});