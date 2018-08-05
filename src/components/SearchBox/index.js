import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Util
} from 'reactstrap';
import { GoSearch } from 'react-icons/go';
import Suggestions from '../Suggestions/index';
import './style.scss';

class SearchBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    cssModule: PropTypes.object,
    onSearch: PropTypes.func,
    searchResults: PropTypes.array
  }

  static defaultProps = {
    onSearch: () => {},
    searchResults: []
  } 

  constructor (props) {
    super(props);

    this.state = {
      showSuggestions: false
    };

    this.handleSearch = debounce(this.handleSearch, 300);
  }

  hanldeInputChange = event => {

    const val = this.getQuery();
    this.handleSearch(val);

    if (val.length === 0) {
      this.setState({
        showSuggestions: false
      });
    } else if (!this.state.showSuggestions) {
      this.setState({
        showSuggestions: true
      });
    }
  }

  handleSelectItem = event => {

    this.setIgnoreBlur(false);
    this.refs.input.blur();
  }

  handInputFocus = event => {

    if (this._ignoreFocus) {
      this.setIgnoreFocus(false);
      return;
    }

    this.setState({
      showSuggestions: this.getQuery().length > 0
    });
  }

  handleInputBlur = event => {

    if (this._ignoreBlur) {
      this.setIgnoreFocus(true);
      this.refs.input.focus();
      return;
    }

    this.getQuery().length === 0 && (this._clearSuggestion = true);

    this.setState({
      showSuggestions: false
    });
  }

  handleInputClick = event => {
    if (!this.state.showSuggestions) {
      this.setState({
        showSuggestions: this.getQuery().length > 0
      });
    }
  }

  handleKeyDown = event => {

    if (!this.state.showSuggestions) {
      this.setState({
        showSuggestions: this.getQuery().length > 0
      });
    }
  }

  handleSearch = query => {
    query.length > 0 && this.props.onSearch(query);
  }

  setIgnoreBlur = (ignore) => {
    this._ignoreBlur = ignore;
  }

  setIgnoreFocus = (ignore) => {
    this._ignoreFocus = ignore;
  }

  getQuery = () => {
    return this.refs.input ? this.refs.input.value : '';
  }

  renderSuggestions = () => {
    return (
      <Suggestions
        results={this.props.searchResults}
        isOpen={this.state.showSuggestions}
        onMouseEnter={() => this.setIgnoreBlur(true)}
        onMouseLeave={() => this.setIgnoreBlur(false)}
        onClick={this.handleSelectItem}
      />
    );
  }

  componentWillMount () {
    this.refs = {};
    this._ignoreBlur = false;
    this._ignoreFocus = false;
  }

  render () {

    let { className, cssModule } = this.props;
    const classes = Util.mapToCssModules(className, cssModule);

    return (
      <div styleName="searchbox" className={classes}>
        <InputGroup>
          <InputGroupAddon
            styleName="input-addon"
            addonType="prepend"
          >
            <InputGroupText styleName="search-icon">
              <GoSearch />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            styleName="search-input"
            placeholder="Search for movies, tv shows and more"
            innerRef={el => this.refs.input = el}
            onKeyDown={this.handleKeyDown}
            onClick={this.handleInputClick}
            onFocus={this.handInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.hanldeInputChange}
          />
          <div styleName="underline"></div>
        </InputGroup>
        {
          this.state.showSuggestions && this.renderSuggestions()
        }
      </div>
    );
  }

}

export default SearchBox;