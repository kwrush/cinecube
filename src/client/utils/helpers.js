import { merge, camelCase } from 'lodash';

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

export const getFullYear = (dateStr) => {
  return dateStr ? new Date(dateStr).getFullYear() : '';
};

/**
 * Calculate time differece from d1 to d2 in the given format,
 * @param {string | integer} d1 time one
 * @param {string | integer} d2 time two
 * @param {string} format time difference in this format, can be seconds, minutes, hours or days
 */
export const differenceInTime = (d1, d2, format) => {

  format = format || 'seconds';
  let factor = 1;

  switch (format) {
    case 'seconds':
      factor = 1000;
      break;
    case 'minutes':
      factor = 1000 * 60;
      break;
    case 'hours':
      factor = 1000 * 60 * 60;
      break;
    case 'days':
      factor = 1000 * 60 * 60 * 24;
      break;
    default:
      break;
  }

  return (new Date(d2) - new Date(d1)) / factor;
};

export const mapToCssModules  = (className = '', cssModule) => {
  if (!cssModule) return className;

  return className
    .split(/\s+/)
    .map(c => cssModule[c] || c)
    .join(' ');
};

export const camelCaseKey = (obj) => {
  const newObj = Array.isArray(obj) ? [] : {};
  
  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      newObj[camelCase(prop)] = camelCaseKey(obj[prop]);
    } else {
      newObj[camelCase(prop)] = obj[prop];
    }
  }
  
  return newObj;
};

export const mapPayloadToState = (state, key, payload) => {

  const result = payload && payload.result ? payload.result : {};
  
  return merge(
    state,
    {
      [`${key}`]: { result }
    }
  );
};

export const mapMetadataToState = (state, key, meta) => {
  const metadata = meta || {}; 

  return merge(
    state,
    {
      [`${key}`]: { metadata }
    }
  );
};