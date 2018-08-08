
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, Util } from 'reactstrap';
import {active} from './style.scss';

const propTypes = {
  classNames: PropTypes.string,
  cssModule: PropTypes.object,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

const defaultProps = {
  navItems: []
};

const HeaderNav = props => {
  let { className, cssModule, navItems } = props;
  const classes = Util.mapToCssModules(className, cssModule);

  return (
    <Nav styleName="nav" className={classes} navbar>
      {
        navItems.map((nav, index) => (
          <NavItem key={index} styleName="nav-item">
            <NavLink 
              to={nav.url} 
              styleName="link"
              activeClassName={active}
            >
              {nav.name}
            </NavLink>
          </NavItem>
        ))
      }
    </Nav>
  );
};

HeaderNav.propTypes = propTypes;
HeaderNav.defaultProps = defaultProps;

export default HeaderNav;
