import './style.scss';

import React from 'react';
import { Container, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FaGithub from 'react-icons/lib/fa/github';


const Footer = () => (
  <footer styleName="footer">
    <div className="d-flex flex-column align-items-center">
      <NavLink to="/" className="d-flex align-items-center" title="Go to CineCube">
        <div styleName="footer-logo"></div>
        <span styleName="logo-text">CineCube</span>
      </NavLink>  
      <div className="">
        <a href="https://kwrush.github.io" target="_blank" title="Go to GitHub page">Kai Wang</a> | Source codes @ <a href="https://github.com/kwrush/cinecube" target="_blank" title="Go to repository page"><FaGithub /></a>
      </div>
    </div>
  </footer>
);

export default Footer;