import React from 'react';
import { Container, FormGroup, Input } from 'reactstrap';

const SearchBox = (props) => (
    <div className="col-sm-2 col-md-2 float-right">
      <Input type="search" name="search" id="search-box" placeholder="Search" />
    </div>
);

export default SearchBox;