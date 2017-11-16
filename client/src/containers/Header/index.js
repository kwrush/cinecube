import React from 'react';
import PropTypes from 'prop-types';
import { 
  Container,
  Collapse, 
  Navbar, 
  NavbarToggler, 
  NavbarBrand, 
} from 'reactstrap';

import NavMenu from 'components/NavMenu/index';
import SearchBox from 'components/SearchBox/index';
import { navLinks } from 'constants/appConstants';

import logo from 'images/logo.png';
import './style.scss';

class Header extends React.Component {
  render () {

    return (
      <Container fluid styleName="header">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">
            <img src={logo} alt="logo" className="d-inline-block align-middle" styleName="logo"/>
            <span styleName="logo-text">Cinematify</span>
          </NavbarBrand>
          <NavbarToggler onClick={() => {}} />
          <Collapse isOpen={true}>
            <NavMenu links={navLinks} />
          </Collapse>
          <SearchBox />
        </Navbar> 
      </Container>
    );
  }
}

export default Header;