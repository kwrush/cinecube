import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'reactstrap';
import { LinkItem } from '../LinkItem'
import { mapToCssModules } from '../../utils/helpers';
import { MOVIE_ROUTES, TV_ROUTES, PEOPLE_ROUTES } from '../../constants/routes';
import './HeaderNav.scss';

function HeaderNav (props) {
  const { onLinkClick, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  return (
    <Nav 
      className={classes} 
      onClick={onLinkClick}
      navbar
    >
      <NavItem styleName="nav-item">
        <LinkItem href={MOVIE_ROUTES.home}>
          {MOVIE_ROUTES.name}
        </LinkItem>
      </NavItem>
      <NavItem styleName="nav-item">
        <LinkItem href={TV_ROUTES.home}>
          {TV_ROUTES.name}
        </LinkItem>
      </NavItem>
      <NavItem styleName="nav-item">
        <LinkItem href={PEOPLE_ROUTES.home}>
          {PEOPLE_ROUTES.name}
        </LinkItem>
      </NavItem>
    </Nav>
  );
}

HeaderNav.propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  onLinkClick: PropTypes.func,
};

HeaderNav.defaultProps = {
  onLinkClick: () => {},
};

export default HeaderNav;