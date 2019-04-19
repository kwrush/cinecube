import * as movie from '../movieApi';
import * as tv from '../tvApi';
import * as people from '../peopleApi';
import * as search from '../searchApi';
import * as trending from '../trendingApi';


jest.mock('../apiUtils', () => ({
  fetchMediaList: jest.fn(() => Promise.resolve({})),
  fetchMediaInfo: jest.fn(() => Promise.resolve('info'))
}));

describe('Client api should run without any error', () => {

  it('should resolve media list call with no parameters', async () => {
    const mp = movie.popularMovies();
    const mu = movie.upcomingMovies();
    const mt = movie.topRatedMovies();
    const mn = movie.nowPlayingMovies();

    const tp = tv.popularTvs();
    const to = tv.onAirTvs();
    const tt = tv.topRatedTvs();

    const pp = people.popularPeople();

    await expect(mp).resolves.toEqual({});
    await expect(mu).resolves.toEqual({});
    await expect(mt).resolves.toEqual({});
    await expect(mn).resolves.toEqual({});

    await expect(tp).resolves.toEqual({});
    await expect(to).resolves.toEqual({});
    await expect(tt).resolves.toEqual({});

    await expect(pp).resolves.toEqual({});
  });

  it('should resolve media list call when parameters are provided', async () => {
    const params = { language: 'zh-CH', page: 2 };
    const mp = movie.popularMovies(params);
    const mu = movie.upcomingMovies(params);
    const mt = movie.topRatedMovies(params);
    const mn = movie.nowPlayingMovies(params);

    const tp = tv.popularTvs(params);
    const to = tv.onAirTvs(params);
    const tt = tv.topRatedTvs(params);

    const pp = people.popularPeople(params);
    
    await expect(mp).resolves.toEqual({});
    await expect(mu).resolves.toEqual({});
    await expect(mt).resolves.toEqual({});
    await expect(mn).resolves.toEqual({});

    await expect(tp).resolves.toEqual({});
    await expect(to).resolves.toEqual({});
    await expect(tt).resolves.toEqual({});

    await expect(pp).resolves.toEqual({});
  });

  it('should resolve detail call when id is provided', async () => {
    const mp = movie.movieDetail(1);
    const tp = tv.tvDetail(1);
    const pp = people.peopleDetail(1);
    await expect(mp).resolves.toBe('info');
    await expect(tp).resolves.toBe('info');
    await expect(pp).resolves.toBe('info');
  });

  it('should resolve detail call when id and options are provided', async () => {
    const params = {page: 1, language: 'zh-CH'};
    
    const mp = movie.movieDetail(1, params);
    const tp = tv.tvDetail(1, params);
    const pp = people.peopleDetail(1, params);
    await expect(mp).resolves.toBe('info');
    await expect(tp).resolves.toBe('info');
    await expect(pp).resolves.toBe('info');
  });

  it('should resolve credits call when id is provided', async () => {
    const mp = movie.movieCredits(1);
    const tp = tv.tvCredits(1);
    const pp = people.peopleCredits(1);
    await expect(mp).resolves.toBe('info');
    await expect(tp).resolves.toBe('info');
    await expect(pp).resolves.toBe('info');
  });

  it('should resolve images call when id is provided', async () => {
    const mp = movie.movieImages(1);
    const tp = tv.tvImages(1);
    const pp = people.peopleImages(1);
    await expect(mp).resolves.toBe('info');
    await expect(tp).resolves.toBe('info');
    await expect(pp).resolves.toBe('info');
  });

  it('should resolve videos call when id is provided', async () => {
    const mp = movie.movieVideos(1);
    const tp = tv.tvVideos(1);
    await expect(mp).resolves.toBe('info');
    await expect(tp).resolves.toBe('info');
  });

  it('should resolve similarMovies call when id is provided', async () => {
    const mp = movie.similarMovies(1);
    const tp = tv.similarTvs(1);
    await expect(mp).resolves.toBe('info');
    await expect(tp).resolves.toBe('info');
  });

  it('should resolve search call when query is provided', async () => {
   
    const s = search.searchMulti('Tom');
    const ms = search.searchMovies('Tom');
    const ps = search.searchPeople('Tom');
    const ts = search.searchTvs('Tom');

    await expect(s).resolves.toEqual({});
    await expect(ms).resolves.toEqual({});
    await expect(ps).resolves.toEqual({});
    await expect(ts).resolves.toEqual({});
  });

  it('should resolve search call when query and parameters are provided', async () => {
    const params = {page: 1, language: 'zh-CH'};
    
    const s = search.searchMulti('Tom', params);
    const ms = search.searchMovies('Tom', params);
    const ps = search.searchPeople('Tom', params);
    const ts = search.searchTvs('Tom', params);

    await expect(s).resolves.toEqual({});
    await expect(ms).resolves.toEqual({});
    await expect(ps).resolves.toEqual({});
    await expect(ts).resolves.toEqual({});
  });

  it('should resolve trending request', async () => {
    const all = trending.trendingAll();
    const m = trending.trendingMovies();
    const t = trending.trendingTvs();
    const p = trending.trendingPeople();

    await expect(all).resolves.toEqual({});
    await expect(m).resolves.toEqual({});
    await expect(t).resolves.toEqual({});
    await expect(p).resolves.toEqual({});
  });
});