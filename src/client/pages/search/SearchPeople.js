import React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

const SearchPeople = props => {
  const search = queryString.parse(props.location.search);
  return <div>{`Search for people ${search.query}`}</div>
};

export default withRouter(SearchPeople);