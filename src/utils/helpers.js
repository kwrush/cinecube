export const mapToCssModules = (className, cssModule) => {
  if (!cssModule) return className;
  return className.split(/\s+/).map(c => cssModule[c] || c).join(' ');
}

export const generateActions = (actions) => {
  const actionMap = {};

  for (let i in actions) {
    if (i < actions.length) {
      actionMap[actions[i]] = actions[i];
    }
  }

  return actionMap;
}