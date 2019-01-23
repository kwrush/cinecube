/**
 * Complete url of images wtih the specific size
 */

import { IMAGE_BASE_URL } from '../constants/routes';

const posterSizes = {
  xs: 'w154',
  s: 'w185',
  m: 'w342',
  lg: 'w500',
  xl: 'w780',
  orig: 'original'
};

const backdropSizes = {
  s: 'w300',
  m: 'w780',
  lg: 'w1280',
  orig: 'original'
};

const profileSizes = {
  s: 'w45',
  m: 'w185',
  lg: 'h632',
  orig: 'original'
};

export const getPosterUrl = (posterUrl, size) => {
  let s = posterSizes[`${size}`];
  s = s ? s : posterSizes.orig;

  return `${IMAGE_BASE_URL}${s}${posterUrl}`;
};

export const getBackdropUrl = (backdropUrl, size) => {
  let s = backdropSizes[`${size}`];
  s = s ? s : backdropSizes.orig;

  return `${IMAGE_BASE_URL}${s}${backdropUrl}`;
};

export const getProfileUrl = (profileUrl, size) => {
  let s = profileSizes[`${size}`];
  s = s ? s : profileSizes.orig;

  return `${IMAGE_BASE_URL}${s}${profileUrl}`;
};