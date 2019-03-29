import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Button,
  Container,
} from 'reactstrap';
import Headroom from 'react-headroom';
import { 
  IoIosMenu, 
  IoMdSearch, 
  IoMdClose 
} from 'react-icons/io';
import { Logo } from '../Logo';
import { Avatar } from '../Avatar';
import { SearchInput } from '../SearchInput';
import { SidebarNav } from '../SidebarNav';
import cx from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import './Header.scss';

class Header extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      showSearchInput: false,
      showSidebarNav: false
    };
  }

  onSearch = query => {
    this.props.history.push(`/search?query=${query}`);
  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      showSidebarNav: !prevState.showSidebarNav
    }));
  }

  toggleSearchInput = e => {
    this.setState(prevState => ({
      showSearchInput: !prevState.showSearchInput
    }));
  }

  render() {
    const { className, cssModule } = this.props;
    const { showSearchInput, showSidebarNav } = this.state;
    const classes = mapToCssModules(className, cssModule);
    const searchInputClasses = cx('header-search-input', { show: showSearchInput });

    return (
      <React.Fragment>
        <Headroom downTolerance={3}>
          <Container 
            fluid 
            styleName="header"
            className={classes}
          >
            <Navbar styleName="navbar override">
              <div>
                <Button
                  styleName="nav-toggler"
                  onClick={this.toggleSidebar}
                >
                  <IoIosMenu style={{ fontSize: '2rem' }} />
                </Button>
              </div>
              <div styleName="header-main">
                <NavbarBrand
                  href="/"
                  styleName="nav-brand"
                >
                  <Logo size="2.25rem" />
                </NavbarBrand>
                <Button 
                  styleName="search-toggler"
                  onClick={this.toggleSearchInput}
                >
                  <IoMdSearch />
                </Button>
                <div styleName={searchInputClasses}>
                  <SearchInput
                    onSearch={this.onSearch}
                  />
                  <Button
                    styleName="search-toggler close"
                    onClick={this.toggleSearchInput}
                  >
                    <IoMdClose />
                  </Button>
                </div>
              </div>
              <div>
                <Button styleName="nav-toggler">
                  <Avatar />
                </Button>
              </div>
            </Navbar>
          </Container>
        </Headroom>
        <SidebarNav
          show={showSidebarNav}
          items={['movie', 'tv', 'people']}
          onClose={this.toggleSidebar}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Header);