export const mapToCssModules = (className, cssModule) => {
  if (!cssModule) return className;
  return !className ? '' : className.split(/\s+/).map(c => cssModule[c] || c).join(' ');
};

export const generateActions = (actions) => {
  const actionMap = {};

  for (let i in actions) {
    if (i < actions.length) {
      actionMap[actions[i]] = actions[i];
    }
  }

  return actionMap;
};

export const descendComparator = (v1, v2) => {
  if (v1 > v2) return -1;
  if (v1 < v2) return 1;
  if (v1 === v2) return 0;
};

export const ascendComparator = (v1, v2) => {
  if (v1 < v2) return -1;
  if (v1 > v2) return 1;
  if (v1 === v2) return 0;
};

export const differenceInDays = (d1, d2) => {
  return (new Date(d1) - new Date(d2)) / 1000 / 60 / 60 / 24;
}