
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  Util
} from 'reactstrap';

import {
  movieRoutes,
  tvRoutes,
  peopleRoutes
} from '../../constants/routes';

import './style.scss';

const propTypes = {
  classNames: PropTypes.string,
  cssModule: PropTypes.object
};

const HeaderNav = props => {
  const classes = Util.mapToCssModules(props.className, props.cssModule);
  const linkClasses = Util.mapToCssModules('text-white');
  const navItems = [movieRoutes, tvRoutes, peopleRoutes];

  return (
    <Nav styleName="nav" className={classes} navbar>
      {
        navItems.map((nav, index) => (
          <NavItem key={index} styleName="nav-item">
            <Link
              to={nav.home}
              className={linkClasses}
              styleName="link"
            >{nav.name}</Link>
          </NavItem>
        ))
      }
    </Nav>
  );
};

HeaderNav.propTypes = propTypes;

export default HeaderNav;
