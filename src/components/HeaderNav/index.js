
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem
} from 'reactstrap';

import {
  movieRoutes,
  tvRoutes,
  peopleRoutes
} from '../../constants/routes';

import './style.scss';

const HeaderNav = props => (
  <Nav justified navbar>
    <NavItem styleName="nav-item">
        <Link to={`${movieRoutes.home}`}>Movie</Link>
    </NavItem>
    <NavItem styleName="nav-item">
        <Link to={`${tvRoutes.home}`}>TV</Link>
    </NavItem>
    <NavItem styleName="nav-item">
      <Link to={`${peopleRoutes.home}`}>People</Link>
    </NavItem>
  </Nav>
);

export default HeaderNav;
