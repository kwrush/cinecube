import { get } from 'lodash';

export const getEntities = (state) => state.entities;

export const getMovieEntities = (state) => get(state, 'entities.movie');

export const getTvEntities = (state) => get(state, 'entities.tv');

export const getPeopleEntities = (state) => get(state, 'entities.people');
