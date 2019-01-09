import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Container } from 'reactstrap';

class SearchInput extends React.PureComponent {

  static propTypes = {
    onSearch: PropTypes.func,
    result: PropTypes.array,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    onSearch: null,
    result: []
  }

  constructor (props) {
    super(props);

    this.state = {
      hasResult: false
    };
    
    this.handleSearch = debounce(this.handleSearch, 400);
  } 

  handleSearch = e => {

  }

  render () {
    return (
      <Container>

      </Container>
    );
  }
}

export default SearchInput;
