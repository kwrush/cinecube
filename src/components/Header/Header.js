import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import { Toolbar, Typography } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';
import Logo from '../Logo/Logo';

const propTypes = {
  cssModule: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  titleColor: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.oneOf([
    'static', 'fixed', 'absolute', 'relative'
  ])
};

const defaultProps = {
  titleColor: blue[500],
  color: grey[200],
  position: 'fixed'  
};

const Header = (props) => {

  const { color, titleColor, position, children, className, cssModule } = props;
  const classes = classNames(mapToCssModules(className, cssModule));

  return (
    <AppBar color={color} position={position} className={classes} >
      <Toolbar>
        <Typography variant="title" color="inherit">
          <Logo size="2.25rem" color={titleColor} />
        </Typography>
        { children }
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;