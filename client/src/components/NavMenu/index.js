import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

import './style.scss';

const propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

const NavMenu = (props) => {
  const { links } = props;

  const navItems = links.map((link, index) => (
    <NavItem key={index}>
      <Link to={link.url} className="nav-link" styleName="link-text">
        {link.tag}
      </Link>
    </NavItem>
  ));

  return (
    <Nav>
      { navItems }
    </Nav>
  );
};

NavMenu.propTypes = propTypes;

export default NavMenu;