import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Button,
  Collapse
} from 'reactstrap';
import Headroom from 'react-headroom';
import MediaQuery from 'react-responsive';
import { IoMdMenu, IoMdSearch } from 'react-icons/io';
import { Logo } from '../Logo';
import { Avatar } from '../Avatar';
import SidebarNav  from './SidebarNav';
import Toggler from './Toggler';
import { mapToCssModules } from '../../utils/helpers';
import SearchBar from './SearchBar';
import './Header.scss';
import HeaderContent from './HeaderSearch';

export const SidebarContext= React.createContext({
  openSidebar: false,
  onToggleSidebar: () => {}
});

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const Header = props => {
  const [openSidebar, toggleSidebar] = useState(false);
  const [showSearchBar, toggleSearchBar] = useState(false);

  const { className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);
  const contentClasses = mapToCssModules(
    'd-flex justify-content-end align-items-center',
    cssModule
  );
  const onToggleSidebar = () => toggleSidebar(!openSidebar);

  return (
    <React.Fragment>
      <Headroom 
        downTolerance={3}
        styleName="header-container"
      >
        <Navbar
          className={classes}
          styleName="override navbar"
        >
          <Toggler
            styleName="nav-toggler"
            onToggle={onToggleSidebar}
          >
            <IoMdMenu />
          </Toggler>
          <div styleName="header-brand">
            <Link to="/" styleName="header-brand-link">
              <Logo size="2.25rem" />
            </Link>
          </div>
          <div className={contentClasses}>
            <HeaderContent />
            <Avatar />
          </div>
        </Navbar>
      </Headroom>
      <SidebarContext.Provider value={{
        openSidebar,
        onToggleSidebar: onToggleSidebar
      }}>
        <SidebarNav items={['movie', 'tv', 'people']} />
      </SidebarContext.Provider>
    </React.Fragment>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = {};

/* class Header extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      openSidebar: false
    };
  }

  onSearch = query => {
    this.props.history.push(`/search?query=${query}`);
  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      openSidebar: !prevState.openSidebar
    }));
  }

  render() {
    const { className, cssModule } = this.props;
    const { openSidebar } = this.state;
    const classes = mapToCssModules(className, cssModule);

    return (
      <React.Fragment>
        <Headroom downTolerance={3} styleName="header-container">
          <Navbar 
            styleName="navbar override" 
            className={classes}
          >
            <Toggler styleName="nav-toggler" onToggle={this.toggleSidebar}>
              <IoMdMenu />
            </Toggler>
            <div styleName="header-main">
              <NavbarBrand 
                href="/"
                styleName="header-brand"
              >
                <Logo size="2.25rem" />
              </NavbarBrand>
              <HeaderSearch styleName="header-search" />
            </div>
            <div>
              <Button styleName="nav-toggler">
                <Avatar />
              </Button>
            </div>
          </Navbar>
        </Headroom>
        <SidebarContext.Provider value={{
          openSidebar,
          onToggleSidebar: this.toggleSidebar
        }}>
          <SidebarNav items={['movie', 'tv', 'people']} />
        </SidebarContext.Provider>
      </React.Fragment>
    );
  }
} */

export default withRouter(Header);