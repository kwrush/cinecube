import { entities } from "../entitiesReducer";
import { entitiesActionTypes } from "../../constants/actionTypes";

describe('Entities reducer tests', () => {
  it('should merge entities correctly', () => {
    const expected = {
      movie: { 1: { id: 1, name: 'A' }, 2: { id: 1, name: 'B' } },
      tv: { 1: { id: 1, name: 'C' }, 3: { id: 3, name: 'D' } },
      people: {},
      credits: {}
    };

    const state = {
      movie: { 1: { id: 1, name: 'AA' }, 2: { id: 1, name: 'B' } },
      tv: { 3: { id: 3, name: 'D' } },
      people: {},
      credits: {}
    }

    const action = {
      type: entitiesActionTypes.MERGE_ENTITIES,
      payload: {
        movie: {1: { id: 1, name: 'A' }},
        tv: {1: { id: 1, name: 'C' }}
      }
    };

    expect(entities(state, action)).toEqual(expected);
  });
});