import React from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import FaSearch from 'react-icons/lib/fa/search';

import './style.scss';

const SearchBar = (props) => (
    <div className="row ml-auto">
        <Form role="search">
            <div styleName="form-group">
              <Label for="search-box" className="sr-only">Search</Label>
              <Input type="search" name="search" id="search-box" styleName="search-input" placeholder="Search" />
            </div>
        </Form>  
    </div>
);

export default SearchBar;