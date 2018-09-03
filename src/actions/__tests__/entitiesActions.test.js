import { mergeEntites } from "../entitiesActions";
import { entitiesActionTypes } from "../../constants/actionTypes";

describe('Entities actions test', () => {
  it('should create action of merging entities', () => {
    const entities = {
      1: { id: 1, name: 'A' },
      2: { id: 2, name: 'B' }
    };

    expect(mergeEntites(entities)).toEqual({
      type: entitiesActionTypes.MERGE_ENTITIES,
      payload: { ...entities }
    });
  });
});