import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';
import { IoMdSearch } from 'react-icons/io';
import { mapToCssModules } from '../../utils/helpers';
import './SearchInput.scss';

class SearchInput extends React.PureComponent {

  static propTypes = {
    placeholderText: PropTypes.string,
    clearValue: PropTypes.bool,
    onSearch: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object,
  }

  static defaultProps = {
    placeholderText: 'Search...',
    clearValue: false,
    onSearch: () => {}
  }

  componentWillMount () {
    this.refs = {};
  }

  componentDidUpdate() {
    if (this.props.clearValue) {
      this.refs.input.value = '';
    }
  }

  handleSearch = () => {
    const query = this.getInputValue();
    // Don't submit search request if query is too short
    if (query.length < 2) return;
    
    this.props.onSearch(query);
  }
  
  handleKeyDown = (e) => {
    e.keyCode === 13 && this.handleSearch();
  }

  getInputValue = () => {
    return this.refs.input.value;
  }

  initRef = el => this.refs.input = el

  render () {

    const { className, cssModule, placeholderText } = this.props;
    const classes = mapToCssModules(className, cssModule);
    
    return (
      <InputGroup
        size="sm"
        styleName="input-container override"
        className={classes}
      >
        <InputGroupAddon addonType="prepend" styleName="input-addon">
          <IoMdSearch />
        </InputGroupAddon>
        <Input
          styleName="search-input"
          innerRef={this.initRef}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholderText}
        />
      </InputGroup>
    );
  }
}

export default SearchInput;