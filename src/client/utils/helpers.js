import { 
  merge, 
  camelCase, 
  unionWith, 
  isEqual 
} from 'lodash';
import { Util } from 'reactstrap';

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

export const mapToCssModules  = Util.mapToCssModules;

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

/**
 * Return Unix timestamp in seconds
 */
export const getTimeStamp = () => Math.floor(Date.now() / 1000);

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

export const uniqueConcat = (...arrs) => {
  return arrs.reduce((prev, curr) => unionWith(prev, curr, isEqual));
};

export const roundToNearest = (num, nearest) => Math.round(num / nearest) * nearest;

export const roundToDicimal = (num, dicimal) => {
  var d = Math.pow(10, dicimal);
  return Math.round(num * d) / d;
}