import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  Button,
  Container
} from 'reactstrap';
import Headroom from 'react-headroom';
import { IoIosMenu, IoMdSearch } from 'react-icons/io';
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

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    this.state = {
      showSearchInput: false,
      showSidebarNav: false
    };
  }

  onSearch = query => {

  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      showSidebarNav: !prevState.showSidebarNav
    }));
  }

  toggleSearchInput = e => {

  }

  render() {
    const { className, cssModule } = this.props;
    const { showSearchInput, showSidebarNav } = this.state;
    const classes = mapToCssModules(className, cssModule);


    return (
      <React.Fragment>
        <Headroom downTolerance={3}>
          <Container fluid styleName="header">
            <Navbar 
              dark 
              expand 
              styleName="navbar override"
              className={classes}
            >
              <NavbarBrand
                tag='button'
                styleName="nav-toggler"
                onClick={this.toggleSidebar}
              >
                <IoIosMenu style={{ fontSize: '2rem' }} />
              </NavbarBrand>
              <NavbarBrand styleName="nav-brand">
                <Logo size="2.25rem" />
              </NavbarBrand>
              <Nav navbar>
                <NavItem>
                  <Button close styleName="search-toggler">
                    <IoMdSearch />
                  </Button>
                </NavItem>
                <NavItem>
                  <Avatar />
                </NavItem>
              </Nav>
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

export default Header;