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
  searchPeople, peopleInfo 
} from '../api';

import { 
  popularMoviesFirstPage, 
  popularMoviesSecondPage,
  movieOverview,
  searchMovieResults
} from './__mock__/movieData';

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
          response: popularMoviesFirstPage
        });

      let onResolve = sinon.spy();
      loadMovies('popular', {
          page: 1
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(popularMoviesFirstPage);
        done();
      })
    });

    it('should return the popular movies in page 2', (done) => {
      
      moxios.stubRequest(`${API_URL}${movieEndPoints.popular}?page=2`, 
        {
          status: 200,
          response: popularMoviesSecondPage
        });

      let onResolve = sinon.spy();
      loadMovies('popular', {
          page: 2
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(popularMoviesSecondPage);
        done();
      })
    });

    it('should return the movie\'s overview', (done) => {
      
      moxios.stubRequest(`${API_URL}${movieEndPoints.info}/1`, 
        {
          status: 200,
          response: movieOverview
        });

      let onResolve = sinon.spy();
      movieInfo(1)
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(movieOverview);
        done();
      })
    });

    it('should return search result', (done) => {
      
      moxios.stubRequest(`${API_URL}${movieEndPoints.search}?query=toy&page=1`, 
        {
          status: 200,
          response: searchMovieResults
        });

      let onResolve = sinon.spy();
      searchMovies('toy', {
          page: 1
        })
        .then(res => res.data)
        .then(onResolve);
  
      moxios.wait(() => {
        expect(onResolve.getCall(0).args[0]).eql(searchMovieResults);
        done();
      })
    });
  });

});