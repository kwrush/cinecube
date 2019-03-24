import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  Container
} from 'reactstrap';
import Logo from '../Logo/Logo';
import { SearchInput } from '../SearchInput';
import Headroom from 'react-headroom';
import { mapToCssModules } from '../../utils/helpers';
import './Header.scss';
import { Avatar } from '../Avatar';

const propTypes = {
  onSearchPending: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  onSearchPending: true,
};

const Header = props => {
  const { onSearchPending, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  return (
    <Headroom downTolerance={3}>
      <Container fluid styleName="header">
        <Navbar dark expand className={classes}>
          <NavbarBrand styleName="nav-brand">
            <Logo size="2.25rem" />
          </NavbarBrand>
          <Nav navbar styleName="nav" className="ml-auto">
            <NavItem styleName="nav-item">
              <SearchInput
                styleName="nav-search-input"
                onSearchPending={onSearchPending} />
            </NavItem>
            <NavItem styleName="nav-item">
              <Avatar />
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
    </Headroom>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;