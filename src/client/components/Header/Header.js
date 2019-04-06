import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';
import Headroom from 'react-headroom';
import { IoMdMenu } from 'react-icons/io';
import { Logo } from '../Logo';
import { Avatar } from '../Avatar';
import SidebarNav  from './SidebarNav';
import Toggler from './Toggler';
import HeaderSearch from './HeaderSearch';
import cx from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import './Header.scss';

export const SidebarContext= React.createContext({
  openSidebar: false,
  onToggleSidebar: () => {}
});

class Header extends React.PureComponent {

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
}

export default withRouter(Header);