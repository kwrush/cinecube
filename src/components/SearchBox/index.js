import './style.scss';

import React from 'react';
import { Form, Label, Input } from 'reactstrap';
import MdSearch from 'react-icons/lib/md/search';


const SearchBox = () => (
  <div className="row ml-auto">
    <div className="col-sm col-md">
      <Form role="search" styleName="search-form">
        <div className="input-group">
          <Label for="search-box" className="sr-only col-form-label-sm">Search</Label>
          <div
            className="input-group-addon"
            styleName="search-button"
            title="Search Cinematify"
          >
            <MdSearch styleName="search-icon" size={20} />
          </div>
          <Input
            type="search"
            name="search"
            id="search-box"
            className="form-control-sm"
            styleName='search-input'
            placeholder="Search Cinematify"
            title="Search Cinematify"
          />
          <div styleName="bottom-border"></div>
        </div>
      </Form>
    </div>
  </div>
);

export default SearchBox;