import React from 'react';
import PropTypes from 'prop-types';
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
    cssModule: PropTypes.object
  }

  static defaultProps = {}

  constructor (props) {
    super(props);

    this.state = {
      query: '',
      results: []
    };
  }

  render () {

    let { className, cssModule } = this.props;
    const classes = Util.mapToCssModules(className, cssModule);

    return (
      <div className={classes}>
        <InputGroup>
          <Input 
            styleName="search-input"
            placeholder="Search for movies, tv shows and more" 
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <GoSearch />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <Suggestions results={this.state.results} />
      </div>
    );
  }

}

export default SearchBox;