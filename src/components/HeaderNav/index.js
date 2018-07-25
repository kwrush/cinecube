
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
 

const HeaderNav = props => (
  <Nav className="ml-auto">
    <NavItem>
      <Link to={`${movieRoutes.home}`}>Movie</Link>
    </NavItem>
    <NavItem>
        <Link to={`${tvRoutes.home}`}>TV</Link>
    </NavItem>
    <NavItem>
      <Link to={`${peopleRoutes.home}`}>People</Link>
    </NavItem>
  </Nav>
);

export default HeaderNav;
