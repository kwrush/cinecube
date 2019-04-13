import React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

const SearchMovie = props => {
  const search = queryString.parse(props.location.search);
  return <div>{`Search for movie ${search.query}`}</div>
};

export default withRouter(SearchMovie);