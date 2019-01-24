import { camelCase, some, get } from 'lodash';

const _camelCaseAction = (actions) => {
  actions = Array.isArray(actions) ? actions : [actions];
  return actions.map(a => camelCase(a));
}

// Return false when all the given actions have been done, otherwise return true
export const isFetching = (actions) => (state) => {
  const camelized = _camelCaseAction(actions);

  return some(camelized, (action) => {
    return get(state, `api.fetching.${action}`);
  });
};

// Return true when any action has failed
export const isFetchingFailure = (actions) => (state) => {
  const camelized = _camelCaseAction(actions);

  return some(camelized, (action) => {
    return get(state, `api.error.${action}.error`);
  });
};

export const getFetchingError = (actions) => (state) => {
  const camelized = _camelCaseAction(actions);
  return camelized.map((action) => get(state, `api.error.${action}.message`));
};