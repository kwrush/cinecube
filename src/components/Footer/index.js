import './style.scss';

import React from 'react';
import { Container, NavbarBrand } from 'reactstrap';
import FaGithub from 'react-icons/lib/fa/github';


const Footer = () => (
  <footer styleName="footer">
    <div className="d-flex flex-column">
      <NavbarBrand title="Go to Cinematify" className="d-flex align-items-center justify-content-center">
        <div className="align-self-center" styleName="footer-logo"></div>
        <span styleName="logo-text">Cinematify</span>
      </NavbarBrand>
      <div className="align-items-center">
        <a href="https://kwrush.github.io" target="_blank" title="Go to GitHub page">Kai Wang</a> | Source codes @ <a href="https://github.com/kwrush/cinematify" target="_blank" title="Go to repository page"><FaGithub /></a>
      </div>
    </div>
  </footer>
);

export default Footer;