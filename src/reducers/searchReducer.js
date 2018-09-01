import { searchActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {};

const search = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default search;

