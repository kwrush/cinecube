import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';

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
      <NavLink href={link.url}>
        <div styleName="link-text">{link.tag}</div>
      </NavLink>
    </NavItem>
  ));

  return (
    <Nav className="ml-auto">
      { navItems }
    </Nav>
  );
};

NavMenu.propTypes = propTypes;

export default NavMenu;