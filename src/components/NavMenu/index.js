import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const NavMenu = (props) => {
  const { links, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  const navItems = links.map((link, index) => (
    <NavItem key={index} className="text-center" styleName="nav-item">
      <NavLink to={link.url} 
        styleName="link" 
        className="d-flex flex-column justify-content-between"
        activeClassName="active-link">
        <span className="d-flex justify-content-center align-items-center" styleName="link-text">{link.tag}</span>
      </NavLink>
    </NavItem>
  ));

  return (
    <Nav className={classes} navbar>
      { navItems }
    </Nav>
  );
};

NavMenu.propTypes = propTypes;

export default NavMenu;