import entities from '../entitiesReducer';
import { entitiesActionTypes } from '../../constants/actionTypes';

describe('Entities reducer tests', () => {
  it('should return the inital state', () => {
    expect(entities(undefined, {})).toEqual({});
  });

  it('should merge entities correctly', () => {
    const expected = {
      movie: { 1: { id: 1, name: 'A' }, 2: { id: 2, name: 'C' } },
      tv: { 1: { id: 1, name: 'C' } },
      people: { 3: { id: 3, name: 'D' } },
    };

    const state = {
      movie: { 1: { id: 1, name: 'A' }, 2: { id: 2, name: 'C' } },
      tv: {  1: { id: 1, name: 'B' } },
      people: {},
    }

    const action = {
      type: entitiesActionTypes.MERGE_ENTITIES,
      payload: {
        tv: {1: { id: 1, name: 'C' }},
        people: {3: { id: 3, name: 'D' }}
      }
    };

    expect(entities(state, action)).toEqual(expected);
  });
});