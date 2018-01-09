import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import {Form, Label, Input, InputGroupAddon, InputGroup} from 'reactstrap';
import MdSearch from 'react-icons/lib/md/search';
import {mapToCssModules} from 'utils/helpers';

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const SearchBox = (props) => {
  const {className, cssModule} = props;
  const classes = mapToCssModules(className, cssModule);

  return (
    <div className={classes}>
      <Form role="search" styleName="search-form">
        <InputGroup styleName="searchbox-group">
          <Label for="searchbox" className="sr-only col-form-label-sm">Search</Label>
          <InputGroupAddon
            className="d-flex flex-column justify-content-center"
            styleName="search-button">
            <MdSearch styleName="search-icon" size={19}/>
          </InputGroupAddon>
          <Input
            type="search"
            name="search"
            id="searchbox"
            styleName='search-input'
            placeholder="Search CineCube"
            title="Search CineCube"
          />
          <div styleName="bottom-border"></div>
        </InputGroup>
      </Form>
    </div>
  );
};

SearchBox.propTypes = propTypes;

export default SearchBox;