import moxios from 'moxios';
import { expect } from 'chai';
import sinon from 'sinon';

import { 
  API_URL, 
  movieEndPoints, 
  tvEndPoints, 
  peopleEndPoints 
} from '../../constants/appConstants';

import { 
  api,
  loadMovies, searchMovies, movieInfo,
  loadTvShows, searchTvShows, tvInfo,
  searchPeople, peopleInfo, searchMulti
} from '../api';

import { 
  popularFirstPage, 
  popularSecondPage,
  overview,
  searchResults,
  multiResults
} from './__mock__/responseData';

describe('Client side api testing', () => {

  beforeEach(() => {
    moxios.install(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  describe('Movie api testing', () => {

    it('should return the popular movies in page 1', (done) => {

      moxios.stubRequest(`${API_URL}${movieEndPoints.popular}?page=1`, 
        {
          status: 200,
          response: popularFirstPage
        });

      let onResolve = sinon.spy();
      loadMovies('popular', {
          page: 1
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(popularFirstPage);
        done();
      });
    });

    it('should return the popular movies in page 2', (done) => {
      
      moxios.stubRequest(`${API_URL}${movieEndPoints.popular}?page=2`, 
        {
          status: 200,
          response: popularSecondPage
        });

      let onResolve = sinon.spy();
      loadMovies('popular', {
          page: 2
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(popularSecondPage);
        done();
      });
    });

    it('should return the movie\'s overview', (done) => {
      
      moxios.stubRequest(`${API_URL}${movieEndPoints.info}/1`, 
        {
          status: 200,
          response: overview
        });

      let onResolve = sinon.spy();
      movieInfo(1)
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(overview);
        done();
      });
    });

    it('should return search result', (done) => {
      
      moxios.stubRequest(`${API_URL}${movieEndPoints.search}?query=toy&page=1`, 
        {
          status: 200,
          response: searchResults
        });

      let onResolve = sinon.spy();
      searchMovies('toy', {
          page: 1
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(searchResults);
        done();
      });
    });
    
    it('should catch the error', (done) => {
      moxios.stubRequest(`${API_URL}${movieEndPoints.popular}`, 
        {
          status: 404,
          responseText: 'Not found'
        });
        
      let onReject = sinon.spy();
      loadMovies('popular')
        .catch(onReject)
  
      moxios.wait(() => {
        expect(onReject.getCall(0));
        done();
      });
    });
  });

  describe('TV shows api testing', () => {
    it('should return the popular tv shows in page 2', (done) => {

      moxios.stubRequest(`${API_URL}${tvEndPoints.popular}?page=2`, 
        {
          status: 200,
          response: popularSecondPage
        });

      let onResolve = sinon.spy();
      loadTvShows('popular', {
          page: 2
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(popularSecondPage);
        done();
      });
    });
    
    it('should return the tv shows on the air', (done) => {

      moxios.stubRequest(`${API_URL}${tvEndPoints.onAir}`, 
        {
          status: 200,
          response: popularFirstPage
        });

      let onResolve = sinon.spy();
      loadTvShows('onAir')
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(popularFirstPage);
        done();
      });
    });

    it('should return the overview', (done) => {
      
      moxios.stubRequest(`${API_URL}${tvEndPoints.info}/1`, 
        {
          status: 200,
          response: overview
        });

      let onResolve = sinon.spy();
      tvInfo(1)
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(overview);
        done();
      });
    });

    it('should return search result', (done) => {
      
      moxios.stubRequest(`${API_URL}${tvEndPoints.search}?query=toy&page=1`, 
        {
          status: 200,
          response: searchResults
        });

      let onResolve = sinon.spy();
      searchTvShows('toy', {
          page: 1
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(searchResults);
        done();
      });
    });
  });
  
  describe('Search multi testing', (done) => {
    it('should return multi search result', (done) => {
      
      moxios.stubRequest(`${API_URL}/search/multi?query=Tom&page=1`, 
        {
          status: 200,
          response: multiResults
        });

      let onResolve = sinon.spy();
      searchMulti('Tom', {
          page: 1
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(multiResults);
        done();
      });
    });
  });
});