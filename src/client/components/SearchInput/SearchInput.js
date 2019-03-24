import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from 'reactstrap';
import { IoIosSearch } from 'react-icons/io';
import { mapToCssModules } from '../../utils/helpers';
import './SearchInput.scss';

class SearchInput extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    cssModule: PropTypes.object,
    onSearchPendding: PropTypes.bool
  }

  static defaultProps = {
    onSearchPendding: false
  }

  constructor (props) {
    super(props);

    this.state = {
      query: '',
      onFocus: false,
      onSubmit: false
    };
  }

  componentWillMount () {
    this.refs = {};
  }

  onSearch = () => {
    const query = this.getInputValue();
    // Don't submit search request if query is empty
    this.setState({
      query,
      onSubmit: !!query
    })
  }
  
  handleKeyDown = (e) => {
    e.keyCode === 13 && this.onSearch();
  }

  handleInputFocus = (e) => {
    this.setState({
      onFocus: true
    });
  }

  handleInputBlur = (e) => {
    this.setState({
      onFocus: false
    })
  }

  getInputValue = () => {
    return this.refs.input.value;
  }

  initRef = el => this.refs.input = el

  render () {

    const { onSearchPendding, className, cssModule } = this.props;
    const { query, onSubmit } = this.state;

    const classes = mapToCssModules(className, cssModule);
    
    return (
      <InputGroup 
        size="sm" 
        styleName="input-container override"
        className={classes}
      >
        <InputGroupAddon addonType="prepend" styleName="input-addon">
          <IoIosSearch />
        </InputGroupAddon>
        <Input
          styleName="search-input"
          innerRef={this.initRef}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          placeholder="Search for movies, tv series and more..."
        />
        {
          onSubmit &&
          <Redirect
            to={{
              pathname: "/search",
              search: `?query=${query.replace(/\s+/g, '+')}`,
              state: { onRequest: onSearchPendding }
            }}
          />
        }
      </InputGroup>
    );
  }
}

export default SearchInput;