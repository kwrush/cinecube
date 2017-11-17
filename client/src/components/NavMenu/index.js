import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

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
    <NavItem key={index} styleName="navmenu-item">
      <Link to={link.url} styleName="link-text">
        {link.tag}
      </Link>
    </NavItem>
  ));

  return (
    <Nav styleName="navmenu" navbar>
      { navItems }
    </Nav>
  );
};

NavMenu.propTypes = propTypes;

export default NavMenu;