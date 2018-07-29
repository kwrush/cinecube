import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Container,
  Row,
  Col
} from 'reactstrap';
import HeaderNav from '../HeaderNav/index';
import Logo from '../Logo';

const Header = props => (
  <div>
    <Navbar color="dark" light expand="md">
        <NavbarBrand href="/">
          <Logo />
        </NavbarBrand>
        <Collapse navbar>
          <Row style={{width: '100%'}}>
            <Col md="8">
              <HeaderNav />
            </Col>
            <Col md="4"></Col>
          </Row>
        </Collapse>
      <NavbarToggler />
    </Navbar>
  </div>
);

export default Header;