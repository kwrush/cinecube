import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { SearchInput } from '../SearchInput';
import { mapToCssModules } from '../../utils/helpers';

class SearchBar extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    clearValue: PropTypes.bool,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    history: null,
    clearValue: false
  }

  performSearch = query => {
    const { history } = this.props;
    history && history.push(`/search?query=${query}`);
  }

  render () {
    const { clearValue, className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);
    return (
      <Container className={classes}>
        <SearchInput 
          onSearch={this.performSearch}
          placeholderText={'Search...'}
          clearValue={clearValue}
        />
      </Container>
    );
  }
}

export default withRouter(SearchBar);