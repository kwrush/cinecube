import React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

const SearchTv = props => {
  const search = queryString.parse(props.location.search);
  return <div>{`Search for tv ${search.query}`}</div>
};

export default withRouter(SearchTv);