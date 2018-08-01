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
import AutoComplete from '../AutoComplete/index';
import './style.scss';

class SearchBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    cssModule: PropTypes.object,
    onSearch: PropTypes.func
  }

  static defaultProps = {
    onSearch: () => {}
  }

  constructor (props) {
    super(props);

    this.state = {
      query: ''
    };

    this.onKeyPress = debounce(this.onKeyPress, 300);
  }

  updateQuery = event => {
    this.setState({
      query: event.target.value
    });
  }

  onKeyPress = event => {
    this.props.onSearch(this.state.query);
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
            onChange={this.updateQuery}
            onKeyPress={this.onKeyPress}
          />
          <div styleName="underline"></div>
        </InputGroup>
        <AutoComplete results={{}} />
      </div>
    );
  }

}

export default SearchBox;