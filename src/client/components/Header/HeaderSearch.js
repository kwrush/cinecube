import React from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { 
  IoMdSearch,
  IoMdClose
} from 'react-icons/io';
import { 
  Transition,
  Spring,
  animated 
} from 'react-spring/renderprops';
import { SearchInput } from '../SearchInput';
import cx from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import './HeaderSearch.scss';
import Toggler from './Toggler';

class HeaderSearch extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    history: null
  }

  constructor (props) {
    super(props);

    this.state = {
      openSearchInput: false
    };
  }

  componentDidMount () {
    this._isMounted = true;
  }

  onSearch = query => {
    const { history } = this.props;
    history && history.push(`/search?query=${query}`);
    this.toggleSearchIpout();
  }

  toggleSearchIpout = e => {
    e && e.preventDefault();
    this.setState(prevState => ({
      openSearchInput: !prevState.openSearchInput
    }));
  }

  render () {
    const { className, cssModule } = this.props;
    const { openSearchInput } = this.state;
    const classes = mapToCssModules(className, cssModule);
    const searchStyles = cx('header-search', { top: openSearchInput });

    return (
      <div styleName={searchStyles}>
        <Spring
          native
          immediate={!this._isMounted}
          from={{ opacity: openSearchInput ? 0 : 1 }}
          to={{ opacity: openSearchInput ? 1 : 0 }}
        >
          {
            ({ opacity }) => (
              <animated.div 
                style={{ opacity }} 
                styleName="search-input-container"
              >
                <SearchInput
                  className={classes}
                  onSearch={this.onSearch}
                />
              </animated.div>
            )
          }
        </Spring>
        <Toggler
          styleName="search-toggler"
          onToggle={this.toggleSearchIpout}
        >
          <Transition
            initial={null}
            items={openSearchInput}
            from={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0
            }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {
              openSearchInput => openSearchInput
                ? props => <IoMdClose style={props} />
                : props => <IoMdSearch style={props} />
            }
          </Transition>
        </Toggler>
      </div>
    );
  }
}

export default withRouter(HeaderSearch);