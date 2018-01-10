import moxios from 'moxios';

import { 
  API_URL, 
  movieDomains, 
  tvDomains
} from 'constants/domains';

import { 
  api,
  loadMovies, searchMovies, movieInfo,
  loadTvShows, searchTvShows, tvShowsInfo,
  searchMulti
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

    it('should return the popular movies in page 1', async () => {
      
      moxios.stubRequest(`${API_URL}${movieDomains.popular}?page=1`, 
        {
          status: 200,
          response: popularFirstPage
        });

      const data = await loadMovies('popular', {
          page: 1
        })
        .then(res => res.data);
      
      expect.assertions(1);
      expect(data).toEqual(popularFirstPage);
    });

    it('should return the popular movies in page 2', async () => {
      
      moxios.stubRequest(`${API_URL}${movieDomains.popular}?page=2`, 
        {
          status: 200,
          response: popularSecondPage
        });

      const data = await loadMovies('popular', {
          page: 2
        })
        .then(res => res.data);
      
      expect.assertions(1);
      expect(data).toEqual(popularSecondPage);
    });

    it('should return the movie\'s overview', async () => {
      
      moxios.stubRequest(`${API_URL}${movieDomains.info}/1`, 
        {
          status: 200,
          response: overview
        });

      const data = await movieInfo(1)
        .then(res => res.data);
      
      expect.assertions(1);
      expect(data).toEqual(overview);
    });

    it('should return search result', async () => {
      
      moxios.stubRequest(`${API_URL}${movieDomains.search}?query=toy&page=1`, 
        {
          status: 200,
          response: searchResults
        });

      const data = await searchMovies('toy', {
          page: 1
        })
        .then(res => res.data);
  
      expect.assertions(1);
      expect(data).toEqual(searchResults);
    });
    
    it('should catch the error', async () => {
      moxios.stubRequest(`${API_URL}${movieDomains.popular}`, 
        {
          status: 404,
          responseText: 'Not found'
        });
        
      return loadMovies('popular').catch(err => 
        expect(err.response.status).toBe(404)
      );
    });
  });

  describe('TV shows api testing', () => {
    it('should return the popular tv shows in page 2', async () => {

      moxios.stubRequest(`${API_URL}${tvDomains.popular}?page=2`, 
        {
          status: 200,
          response: popularSecondPage
        });

      const data = await loadTvShows('popular', {
          page: 2
        })
        .then(res => res.data);

      expect.assertions(1);
      expect(data).toEqual(popularSecondPage);
    });
    
    it('should return the tv shows on the air', async () => {

      moxios.stubRequest(`${API_URL}${tvDomains.onAir}`, 
        {
          status: 200,
          response: popularFirstPage
        });

      const data = await loadTvShows('onAir')
        .then(res => res.data);
      
      expect.assertions(1);
      expect(data).toEqual(popularFirstPage);
    });

    it('should return the overview', async () => {
      
      moxios.stubRequest(`${API_URL}${tvDomains.info}/1`, 
        {
          status: 200,
          response: overview
        });

      const data = await tvShowsInfo(1)
        .then(res => res.data);
      expect.assertions(1);
      expect(data).toEqual(overview);
    });

    it('should return search result', async () => {
      
      moxios.stubRequest(`${API_URL}${tvDomains.search}?query=toy&page=1`, 
        {
          status: 200,
          response: searchResults
        });

      const data = await searchTvShows('toy', {
          page: 1
        })
        .then(res => res.data);

      expect.assertions(1);
      expect(data).toEqual(searchResults);
    });
  });
  
  describe('Search multi testing', () => {
    it('should return multi search result', async () => {
      
      moxios.stubRequest(`${API_URL}/search/multi?query=Tom&page=1`, 
        {
          status: 200,
          response: multiResults
        });

      const data = await searchMulti('Tom', {
          page: 1
        })
        .then(res => res.data);

      expect.assertions(1);
      expect(data).toEqual(multiResults);
    });
  });
});