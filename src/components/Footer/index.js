import React from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink 
} from 'reactstrap';
import { GoMarkGithub } from 'react-icons/go';
import Logo from '../Logo/index';

import './style.scss';

const Footer = props => (
  <footer styleName="footer">
    <Container>
      <Nav pills styleName="footer-nav">
        <NavItem styleName="footer-nav-item">
          <NavLink href="/">
            <div styleName="footer-logo">
              <Logo size={1.4} color="#FFF" hoverAnimation={false} />
            </div>
            CineCube
          </NavLink>
        </NavItem>
        <NavItem styleName="footer-nav-item">
          <NavLink href="https://github.com/kwrush/cinecube">
            <GoMarkGithub />
          </NavLink>
        </NavItem>
      </Nav>
    </Container>
  </footer>
);

export default Footer;