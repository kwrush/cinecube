import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import './LinkItem.scss';

const LinkItem = (props) => {
  const { href, className, cssModule, children } = props;
  const classes = mapToCssModules(classNames('nav-link', className), cssModule);
  const activeClass = mapToCssModules('active', cssModule);

  return (
    <NavLink 
      to={href}
      styleName="link-item"
      className={classes}
      activeClassName={activeClass} 
    >
      { children }
    </NavLink>
  );
};

LinkItem.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.object
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

export default LinkItem;