import React from 'react';
import PropTypes from 'prop-types';
import { 
  Collapse, 
  Navbar, 
  NavbarToggler, 
  NavbarBrand, 
  Nav, 
  NavItem, 
  NavLink 
} from 'reactstrap';

import logo from 'images/logo.png';
import './style.scss';

class Header extends React.Component {
  render () {
    return (
      <div styleName="header">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">
            <img src={logo} alt="logo" className="d-inline-block align-middle" styleName="logo"/>
            <span styleName="logo-text">Cinematify</span>
          </NavbarBrand>
          <NavbarToggler onClick={() => {}} />
          <Collapse isOpen={true}>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink href="/movie/">Movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tv/">TVs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/people/">People</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar> 
      </div>
    );
  }
}

export default Header;