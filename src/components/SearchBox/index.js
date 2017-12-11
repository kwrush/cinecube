import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input } from 'reactstrap';
import MdSearch from 'react-icons/lib/md/search';
import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const SearchBox = (props) => {

  const { className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  return (
    <div className={classes}>
      <div styleName="searchbox-container">
        <Form role="search" styleName="search-form">
          <div className="input-group" styleName="searchbox-group">
            <Label for="searchbox" className="sr-only col-form-label-sm">Search</Label>
            <div
              className="input-group-addon"
              styleName="search-button"
              title="Search Cinematify"
            >
              <MdSearch styleName="search-icon" size={19} />
            </div>
            <Input
              type="search"
              name="search"
              id="searchbox"
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
};

SearchBox.propTypes = propTypes;

export default SearchBox;