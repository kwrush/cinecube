import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { 
  Spring,
  animated 
} from 'react-spring/renderprops';
import { IoMdSearch } from 'react-icons/io';
import Toggler from './Toggler';
import SearchBar from './SearchBar';
import './HeaderSearch.scss';
import { mapToCssModules } from '../../utils/helpers';

class HeaderSearch extends React.PureComponent {

  static propTypes = {
    cssModule: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.state = {
      showSearchBar: false
    }

    this._isMounted = false;
  }

  componentDidMount () {
    this._isMounted = true;
  }

  toggleSearchBar = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar
    }));
  }

  onToggleSearchBar = e => {
    e.preventDefault();
    this.toggleSearchBar();
  }

  render () {
    const { showSearchBar } = this.state;
    const classes = mapToCssModules('rounded-bottom', this.props.cssModule); 

    return (
      <MediaQuery minWidth={575}>
        <Toggler
          styleName="search-toggler"
          onToggle={this.onToggleSearchBar}
        >
          <IoMdSearch />
        </Toggler>
        <Spring
          native
          immediate={!this._isMounted}
          from={{
            opacity: showSearchBar ? 0 : 1,
          }}
          to={{
            opacity: showSearchBar ? 1 : 0,
          }}
        >
          {
            (props) => (
              <animated.div 
                style={props} 
                className={classes}
                styleName="searchbar-container"
              >
                <SearchBar />
              </animated.div>
            )
          }
        </Spring>
      </MediaQuery>
    );
  }
}

export default HeaderSearch;