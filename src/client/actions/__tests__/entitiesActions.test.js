import { mergeEntities } from "../entitiesActions";
import { entitiesActionTypes as t } from "../../constants/actionTypes";

describe('Entities actions test', () => {
  it('should create an action to merge entities', () => {
    const entities = {
      movie: { id: 1, title: 'a' },
      tv: { id: 1, name: 'b' },
      people: { id: 1, name: 'c' }
    };

    expect(mergeEntities(entities)).toEqual({
      type: t.MERGE_ENTITIES,
      payload: { ...entities }
    });
  });
});