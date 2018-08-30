import { getEntities, getEntityIds, getInfoId } from '../commonSelectors';

describe('Selectors test', () => {

  const state = {
    entities: {
      movie: { 1: { 'title': 'A' }, 2: { 'title': 'B' } },
      tv: { 2: { 'title': 'AA' }, 3: { 'title': 'BB' } },
      people: { 2: { 'title': 'P1' }, 5: { 'title': 'P2' } },
    },
    move: {
      popular: {items: [1, 2]},
    },
    tv: {
      popular: {items: [2, 3]}
    },
    people: {
      popular: {items: [2, 5]},
      info: { target: 5 }
    }
  };

  it('should get entities correctly', () => {
    expect(getEntities(state, 'movie')).toEqual(state.entities.movie);
  });

  it('should get entity ids corrrectly', () => {
    expect(getEntityIds(state, 'tv', 'popular')).toEqual([2, 3])
  });

  it('should get info id of people correctly', () => {
    expect(getInfoId(state, 'people')).toEqual(5);
  });
});