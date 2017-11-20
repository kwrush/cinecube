import './style.scss';

import React from 'react';
import { Container } from 'reactstrap';
import FaGithub from 'react-icons/lib/fa/github';


const Footer = () => (
  <footer styleName="footer">
    <div className="d-flex justify-content-end">
      <p className="align-items-center">
        Author: <a href="https://kwrush.github.io" target="_blank" title="Go to GitHub page">Kai Wang</a> | Source codes are available at <a href="https://github.com/kwrush/cinematify" target="_blank" title="Go to repository page"><FaGithub /></a>
      </p>
    </div>
  </footer>
);

export default Footer;