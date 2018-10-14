import React from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink 
} from 'reactstrap';
import { GoMarkGithub } from 'react-icons/go';
import { Logo } from '../Logo';

import './style.scss';

const Footer = props => (
  <footer styleName="footer">
    <Container>
      <Nav styleName="footer-nav">
        <NavItem styleName="footer-nav-item">
          <NavLink href="/">
            <div styleName="footer-logo">
              <Logo size="1.3rem" hoverAnimation={false} />
            </div>
            <span styleName="logo-text">CineCube</span>
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