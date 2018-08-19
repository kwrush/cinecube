import moxios from 'moxios';
import {
  popularFirstPage,
  popularSecondPage,
  overview,
  credits,
  multiResults
} from '../__mockData__/apiData';
import {
  API_URL
} from '../../constants/routes';
import { 
  api,
  fetchMediaList,
  fetchMediaInfo 
} from '../apiUtils';
import { searchMulti } from '../searchApi';

describe('Client api testing', () => {

  describe('Api utilities tests', () => {

    beforeEach(() => {
      moxios.install(api);
    });

    afterEach(() => {
      moxios.uninstall(api);
    });

    it('should fetch the popular movies in the 1st page.', async () => {
      moxios.stubRequest(`${API_URL}/movie/popular?page=1`, {
        status: 200,
        response: popularFirstPage
      });

      const res = await fetchMediaList('movie', 'popular', { page: 1 }).then(res => res);
      const data = res.data;

      expect.assertions(1);
      expect(data).toEqual(popularFirstPage);
    });

    it('should fetch the popular movies in the 2nd page', async () => {
      moxios.stubRequest(`${API_URL}/movie/popular?page=2`, {
        status: 200,
        response: popularSecondPage
      });

      const res = await fetchMediaList('movie', 'popular', { page: 2 }).then(res => res);

      expect.assertions(1);
      expect(res.data).toEqual(popularSecondPage);
    });

    it('should fetch the info for the given media id', async () => {

      moxios.stubRequest(`${API_URL}/tv/1`, {
        status: 200,
        response: overview
      });

      const res = await fetchMediaInfo('tv', 1).then(res => res);
      expect.assertions(1);
      expect(res.data).toEqual(overview);
    });

    it('should fetch the specified info for the media id', async () => {
      moxios.stubRequest(`${API_URL}/tv/1/credits`, {
        status: 200,
        response: credits
      });

      const res = await fetchMediaInfo('tv', 1, 'credits').then(res => res);
      expect.assertions(1);
      expect(res.data).toEqual(credits);
    });
  });

  describe('Multi search test', () => {

    beforeEach(() => {
      moxios.install(api);
    });

    afterEach(() => {
      moxios.uninstall(api);
    });

    it('should fetch the multi search result correctly', async () => {

      moxios.stubRequest(`${API_URL}/search/multi?query=Tom&page=1`, {
        status: 200,
        response: multiResults
      });

      const res = await searchMulti('Tom', { page: 1 }).then(res => res);

      expect.assertions(1);
      expect(res.data).toEqual(multiResults);
    });
  });
});