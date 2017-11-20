import './style.scss';

import React from 'react';
import { Navbar } from 'reactstrap';
import FaGithub from 'react-icons/lib/fa/github';


const Footer = () => (
  <footer styleName="footer">
    <a href="https://github.com/kwrush/cinematify" title="Go to GitHub">
      <FaGithub />
    </a>
  </footer>
);

export default Footer;