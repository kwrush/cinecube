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

    this.performSearch = debounce(this.performSearch, 300);
  }

  updateQuery = event => {
    this.performSearch(event.target.value);

    if (event.target.value.length === 0) {
      this.setState({
        showSuggestions: false
      })
    }
  }

  onSuggestionSelect = evnet => {
    this.setIgnoreBlur(false);
    this._inputRef.blur();
  }

  handInputFocus = event => {
    if (this._ignoreFocus) {
      this._ignoreFocus = false;
      return;
    }

    this.setState({
      showSuggestions: this._inputRef.value.length > 0
    });
  }

  handleInputBlur = event => {
    if (this._ignoreBlur) {
      this._ignoreFocus = true;
      this._inputRef.focus();
      return;
    }

    this.setState({
      showSuggestions: false
    });
  }

  handleInputClick = event => {
    if (!this.state.showSuggestions) {
      this.setState({
        showSuggestions: this._inputRef.value.length > 0
      });
    }
  }

  handleKeyDown = event => {

    if (!this.state.showSuggestions) {
      this.setState({
        showSuggestions: this._inputRef.value.length > 0
      });
    }
  }

  performSearch = query => {
    query.length > 0 && this.props.onSearch(query);
  }

  setIgnoreBlur = (ignore) => {
    this._ignoreBlur = ignore;
  }

  renderSuggestions = () => {
    return (
      <Suggestions
        results={this.props.searchResults}
        isOpen={this.state.showSuggestions}
        onMouseEnter={() => this.setIgnoreBlur(true)}
        onMouseLeave={() => this.setIgnoreBlur(false)}
        onClick={this.onSuggestionSelect}
      />
    );
  }

  componentWillMount () {
    this._inputRef = null;
    this._ignoreBlur = false;
    this._ignoreFocus = false;
  }

  componentWillUpdate (nextProps, nextState) {
    // if (nextState.query !== this.state.query) {
    //   this.performSearch(nextState.query);
    // }
  }

  componentDidUpdate (prevProps, prevState) {

    // if (this.state.showSuggestions) {
    //   this.setState({
    //     showSuggestions: this.state.query.length > 0
    //   });
    // } else if (!this.state.showSuggestions && ) {
    //   this.setState({
    //     showSuggestions: true
    //   });
    // }
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
            innerRef={input => this._inputRef = input}
            onKeyDown={this.handleKeyDown}
            onClick={this.handleInputClick}
            onFocus={this.handInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.updateQuery}
          />
          <div styleName="underline"></div>
        </InputGroup>
        { this.state.showSuggestions && this.renderSuggestions() }
      </div>
    );
  }

}

export default SearchBox;